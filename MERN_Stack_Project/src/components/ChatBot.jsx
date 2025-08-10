import React, { useEffect } from 'react';

const ChatBot = () => {
    useEffect(() => {
        window.watsonAssistantChatOptions = {
            integrationID: import.meta.env.VITE_WATSONX_INTEGRATION_ID, // The ID of this integration.
            region: "eu-de", // The region your integration is hosted in.
            serviceInstanceID: import.meta.env.VITE_WATSONX_SERVICE_INSTANCE_ID, // The ID of your service instance.
            onLoad: async (instance) => { await instance.render(); }
        };

        setTimeout(() => {
            const t = document.createElement('script');
            t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
                (window.watsonAssistantChatOptions.clientVersion || 'latest') +
                "/WatsonAssistantChatEntry.js";
            document.head.appendChild(t);
        }, 0); // Run immediately after mount
    }, []);

    return <></>; // No visible DOM needed for Watson Assistant
};

export default ChatBot;
