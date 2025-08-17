import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    Collapse,
    Card,
    Spinner,
    CloseButton,
    Row,
    Col,
} from 'react-bootstrap';
import { BsChatDotsFill, BsSend } from 'react-icons/bs';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([
        { type: 'ai', text: 'Chào bạn! Tôi là DearFab AI. Tôi có thể giúp gì cho bạn hôm nay?' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleToggle = () => setOpen(!open);

    const handleSend = async () => {
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) return;

        setMessages(prev => [...prev, { type: 'user', text: trimmedPrompt }]);
        setPrompt('');
        setLoading(true);

        try {
            const res = await axios.post('https://chatbot.dearfab.com:13443/chat', {
                prompt: trimmedPrompt,
            });

            setMessages(prev => [
                ...prev,
                { type: 'ai', text: res.data.message },
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { type: 'ai', text: 'Lỗi khi gọi API. Vui lòng thử lại.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Chat Button */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1050 }}>
                <Button
                    variant="success"
                    onClick={handleToggle}
                    className="rounded-circle p-3 shadow"
                >
                    {open ? <CloseButton variant="white" /> : <BsChatDotsFill size={20} />}
                </Button>
            </div>

            {/* Chat Window */}
            <Card
                style={{
                    position: 'fixed',
                    bottom: 90,
                    right: 20,
                    width: 400,
                    zIndex: 1040,
                    display: open ? 'flex' : 'none',
                    flexDirection: 'column',
                    maxHeight: 500,
                }}
                className="shadow"
            >
                <Card.Header className="bg-success text-white">
                    Trò chuyện với DearFab AI
                </Card.Header>

                <Card.Body style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {messages.map((msg, idx) => (
                        <Row
                            key={idx}
                            className={`mb-2 justify-content-${msg.type === 'user' ? 'end' : 'start'}`}
                        >
                            <Col xs="auto">
                                <div
                                    className={`p-2 rounded ${
                                        msg.type === 'user'
                                            ? 'bg-success text-white'
                                            : 'bg-light border'
                                    }`}
                                    style={{ maxWidth: '250px', whiteSpace: 'pre-wrap' }}
                                >
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                            </Col>
                        </Row>
                    ))}

                    {loading && (
                        <div className="text-center my-2">
                            <Spinner animation="border" size="sm" />
                        </div>
                    )}
                </Card.Body>

                <Card.Footer className="bg-white">
                    <Form.Control
                        type="text"
                        placeholder="Nhập tin nhắn..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={loading}
                    />
                    <Button
                        variant="success"
                        className="mt-2 w-100 d-flex align-items-center justify-content-center"
                        onClick={handleSend}
                        disabled={loading}
                    >
                        <BsSend className="me-2" />
                        Gửi
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
};

export default ChatBot;
