
import { useState } from "react";
import "./AIAssistant.css";

function AIAssistant() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello! I'm your Student Management Assistant. Ask me about attendance, marks or academic performance."
        }
    ]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!question.trim() || loading) return;

        const currentQuestion = question.trim();

        // Get logged-in user details
        const role = localStorage.getItem("userRole");
        const studentId = localStorage.getItem("studentId");

        // Automatically add Student ID for student login
        const backendQuestion =
            role?.toUpperCase() === "STUDENT"
                ? studentId
                    ? `${currentQuestion} for student ${studentId}`
                    : null
                : currentQuestion;

        // Check Student ID
        if (role?.toUpperCase() === "STUDENT" && !studentId) {

            setMessages(prev => [
                ...prev,
                { sender: "user", text: currentQuestion },
                {
                    sender: "ai",
                    text: "Your Student ID was not found. Please log out and log in again. If the problem continues, check whether your login response saves the Student ID."
                }
            ]);

            setQuestion("");
            return;
        }

        // Display user question
        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: currentQuestion
            }
        ]);

        setQuestion("");
        setLoading(true);

        try {

            const response = await fetch(
                "https://student-attendance-and-performance.onrender.com/api/ai/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: backendQuestion
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Server error.");
            }

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: data.reply || data.error || "No response received."
                }
            ]);

        } catch (error) {

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: "Unable to connect to the server. Please check whether the backend is running."
                }
            ]);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="ai-assistant">

            {/* AI HEADER */}
            <div className="ai-header">

                <h2>AI Student Assistant</h2>

                <span>Online</span>

            </div>

            {/* CHAT MESSAGES */}
            <div className="ai-messages">

                {messages.map((message, index) => (

                    <div
                        key={index}
                        className={`ai-message ${message.sender}`}
                    >
                        {message.text}
                    </div>

                ))}

                {loading && (

                    <div className="ai-message ai">
                        Thinking...
                    </div>

                )}

            </div>

            {/* CHAT INPUT */}
            <div className="ai-input-area">

                <input
                    type="text"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") sendMessage();
                    }}
                    placeholder="Ask about attendance or marks..."
                    disabled={loading}
                />

                <button
                    onClick={sendMessage}
                    disabled={loading || !question.trim()}
                >
                    {loading ? "Sending..." : "Send"}
                </button>

            </div>

        </div>

    );
}

export default AIAssistant;
