document.addEventListener("DOMContentLoaded", () => {
    peoplePlusAI_widget.init({
        client_id: "9a646bef-1fac-4832-b5d0-778a39711fdb",
        client_secret: "93jh7MefEba3v8_EgTpYbnaxQNj-MBbnSusFvX6bxws",
        domain: "adraproductstudio.github.io",
    });
});

(function (window, document) {

    const peoplePlusAI_widget = {
        init: function (config) {

            const {
                client_id,
                client_secret,
                domain,
                containerId = "peoplePlusAI-widget-section",
            } = config;

            if (client_id && client_secret && domain) {
                this.injectStyles();
                // this.injectGoogleFonts();
                this.renderChatWidget(client_id, client_secret, domain, containerId);
            }
        },

        // injectGoogleFonts: function () {
        //     const link = document.createElement("link");
        //     link.rel = "stylesheet";
        //     link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap";
        //     document.head.appendChild(link);
        // },

        injectStyles: function (style) {
            const styleTag = document.createElement("style");
            styleTag.innerHTML = `
                @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
                :root {
                    --overall-theme : #005C75;
                    --incoming-msg-bg : #F2F2F2;
                    --incoming-msg-text : #000;
                    --outgoing-msg-bg : #E7F1F3;
                    --outgoing-msg-text : #005C75;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .peoplePlusAI-widget .peoplePlusAI-chatbox-container::-webkit-scrollbar,
                .MR-chat-input textarea::-webkit-scrollbar{
                    display: none;
                }

                .peoplePlusAI-widget .peoplePlusAI-chatbox-container::-webkit-scrollbar,
                .MR-chat-input textarea::-webkit-scrollbar{
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }

                .peoplePlusAI-widget {
                    position: fixed;
                    bottom: 121px;
                    right: 40px;
                    background-color: #fff;
                    width: 420px;
                    height:650px;
                    border-radius: 15px;
                    overflow: hidden;
                    transform: scale(0.5);
                    opacity: 0;
                    transition: all 0.2s linear;
                    border: 1px solid rgb(228, 228, 228);
                    z-index: 1000
                }
                .peoplePlusAI-widget.full-screen {
                    position: fixed;
                    bottom: 121px;
                    right: 40px;
                    background-color: #fff;
                    width: 95%;
                    height:82%;
                    border-radius: 15px;
                    overflow: hidden;
                    transform: scale(0.5);
                    opacity: 0;
                    transition: all 0.2s linear;
                    border: 1px solid rgb(228, 228, 228);
                    z-index: 1000
                }
                .MR-show-chatbot .peoplePlusAI-widget {
                    transform: scale(1);
                    opacity: 1;
                    transition: all 0.2s linear;
                }
                .peoplePlusAI-widget .MR-header {
                    background-color: var(--overall-theme);
                    text-align: center;
                    position: relative;
                    height:68px;
                    display: flex;
                    align-items:center;
                    justify-content:space-between;
                    position:relative;
                }
                .peoplePlusAI-widget .MR-header .full-screen-icon.show {
                    position: absolute;
                    right: 32px;
                    width: 50px; /* Adjust the size as needed */
                    height: 50px; /* Adjust the size as needed */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor:pointer;
                }
                .peoplePlusAI-widget .MR-header .full-screen-icon {
                    position: absolute;
                    right: 50px;
                    width: 50px; /* Adjust the size as needed */
                    height: 50px; /* Adjust the size as needed */
                    display: none;
                }

                .peoplePlusAI-widget .MR-header .full-screen-icon::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background:rgba(73, 209, 246, 0.58);
                    filter: blur(22px); /* Apply blur to background */
                    border-radius: 50%; /* Optional: Make it circular */
                }
                .peoplePlusAI-widget .MR-header .minimized-screen-icon {
                    position: absolute;
                    right: 32px;
                    width: 50px; /* Adjust the size as needed */
                    height: 50px; /* Adjust the size as needed */
                    display: none;
                }

                 .peoplePlusAI-widget .MR-header .minimized-screen-icon.show {
                    position: absolute;
                    right: 32px;
                    width: 50px; /* Adjust the size as needed */
                    height: 50px; /* Adjust the size as needed */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor:pointer;
                }
                
                .peoplePlusAI-widget .MR-header .minimized-screen-icon::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background:rgba(73, 209, 246, 0.58);
                filter: blur(22px); /* Apply blur to background */
                border-radius: 50%; /* Optional: Make it circular */
                }

                .peoplePlusAI-widget .MR-header .close-icon {
                    position: absolute;
                    top: 50%;
                    right: 30px;
                    transform: translateY(-50%);
                    color: #fff;
                    display: none;
                }
                .peoplePlusAI-widget .MR-header {
                    background-color: var(--overall-theme);
                    text-align: center;
                    position: relative;
                    height:68px;
                    display: flex;
                    align-items:center;
                    justify-content:space-between;
                    padding : 0 0 0 20px;
                }
                .peoplePlusAI-widget .MR-chat-container{
                    height: 541px;
                }
                .peoplePlusAI-widget.full-screen .MR-chat-container{
                    height: 82%;
                }
                .peoplePlusAI-widget .peoplePlusAI-chatbox-container {
                    height: 541px;
                    padding: 15px 20px 70px;
                    overflow-y: scroll;
                    background: url("https://d1olhs2thomfrd.cloudfront.net/chatBackground.png");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .peoplePlusAI-widget.full-screen .peoplePlusAI-chatbox-container {
                    height: 100%;
                    padding: 15px 20px 70px;
                    overflow-y: scroll;
                    background: url("https://d1olhs2thomfrd.cloudfront.net/chatBackground.png");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                .peoplePlusAI-widget .chat {
                    display: flex;
                }
                .peoplePlusAI-chatbox-container .incoming {
                    margin-top: 7px;
                }
                .peoplePlusAI-chatbox-container .smart-toy {
                    height: 32px;
                    width: 32px;
                    align-self: flex-end;
                    background-color: var(--overall-theme);
                    color: #fff;
                    text-align: center;
                    margin: 0 10px 7px 0;
                    line-height: 32px;
                    border-radius: 4px;
                }
                .peoplePlusAI-chatbox-container .outgoing {
                    margin: 20px 0;
                    justify-content: flex-end;
                }
                .peoplePlusAI-widget .MR-chat-input {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    border-top: 1px solid #ccc;
                    display: flex;
                    align-items:center;
                    justify-content:center;
                    gap: 5px;
                    background:var(--overall-theme);
                    height:91px;
                }
                .MR-chat-input textarea {
                    border: none;
                    outline: none;
                    font-size: 0.95rem;
                    resize: none;
                    width: 90%;
                    font-size: 14px;
                    font-family: "Inter", serif;
                    box-shadow: none !important;
                    margin:0 18px;
                    height:40px;
                    line-height: 18px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    padding-left: 28px;
                    padding-right: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 33px;
                    position : relative;
                }
                .peoplePlusAI-widget.full-screen .MR-chat-input textarea {
                    font-size: 16px;
                    line-height: 1.5em;
                    padding: 8px 60px 0px 15px;
                    margin:0 0px;
                    width: 95%;
                }
                .peoplePlusAI-widget #MR-send-btn {
                    position: absolute;
                    right: 7%;
                    top: 31.5px;
                    font-size: 24px;
                    cursor: pointer;
                    align-self: center;
                    opacity: 0.3;
                    pointer-events: none;
                    width:27px;
                    height:27px;
                    text-align:center;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    background-color:#E7F1F3;
                    border-radius: 35.526px;
                }
                .peoplePlusAI-widget.full-screen #MR-send-btn {
                    position: absolute;
                    right: 4%;
                    top: 31.5px;
                    font-size: 24px;
                    cursor: pointer;
                    align-self: center;
                    opacity: 0.3;
                    width:27px;
                    height:27px;
                    text-align:center;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    background-color:#E7F1F3;
                    border-radius: 35.526px;
                }
                .MR-chat-input textarea:valid~#MR-send-btn {
                    opacity: 1; 
                    pointer-events: all; 
                    color:var(--overall-theme) !important;
                    width:27px;
                    height:27px;
                    text-align:center;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                .peoplePlusAI-widget-toggler {
                    position: fixed;
                    bottom: 40px;
                    right: 35px;
                    background-color: var(--overall-theme);
                    color: #fff;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index :999;
                }
                .peoplePlusAI-widget-toggler p {
                    position: absolute;
                }
                .peoplePlusAI-widget-toggler .message-icon {
                    opacity: 1;
                    margin-bottom: 0;
                }
                .peoplePlusAI-widget-toggler .close-icon {
                    opacity: 0;
                    margin-bottom: 0;
                }
                .MR-show-chatbot .peoplePlusAI-widget-toggler .message-icon {
                    opacity: 0
                }
                .MR-show-chatbot .peoplePlusAI-widget-toggler .close-icon {
                    opacity: 1;
                }
                .bot-icon {
                    width: 30px;
                    height: 30px;
                    flex-shrink: 0;
                }
                .user-icon {
                    width: 30px;
                    height: 30px;
                    flex-shrink: 0;
                    align-self: flex-end;
                }
                .peoplePlusAI-widget .placeholder-msg {
                    display: flex;
                    width: 85%;
                    margin-bottom: 1rem;
                }
                .peoplePlusAI-widget .incoming-msg {
                    display: flex;
                    width: 85%;
                    margin-bottom: 1rem;
                }
                .peoplePlusAI-widget .botText {
                    color: #000;
                    font-weight: normal;
                    font-size: 14px;
                    text-align: left;
                    margin-bottom: 1rem;
                    font-family: "Inter", serif;
                }
                .peoplePlusAI-widget .botText span {
                    line-height: 1.5em;
                    display: inline-block;
                    background-color: var(--overall-theme);
                    color: #fff;
                    padding: 10px;
                    border-radius: 8px;
                    border-bottom-left-radius: 2px;
                    max-width: 100%;
                    margin-left: 10px;
                    animation: floatup .5s forwards;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                }
                .peoplePlusAI-widget .placeholder-msg-text {
                    line-height: 1.5em;
                    display: inline-block;
                    background-color: var(--incoming-msg-bg);
                    color: var(--incoming-msg-text);
                    font-size: 14px;
                    padding: 10px;
                    padding-left : 18px;
                    padding-right : 18px;
                    border-radius: 8px;
                    border-top-left-radius: 2px;
                    max-width: 100%;
                    margin-left: 10px;
                    animation: floatup .5s forwards;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                    font-family: "Inter", serif;
                }
                .peoplePlusAI-widget.full-screen .placeholder-msg-text {
                    font-size: 16px;
                    line-height: 1.5em;
                }
                .peoplePlusAI-widget .incoming-msg-text {
                    line-height: 1.5em;
                    display: inline-block;
                    background-color: var(--incoming-msg-bg);
                    color: var(--incoming-msg-text);
                    font-size: 14px;
                    padding: 10px;
                    padding-left : 18px;
                    padding-right : 18px;
                    border-radius: 0px 12px 12px 12px;
                    max-width: 100%;
                    margin-left: 10px;
                    animation: floatup .5s forwards;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    hyphens: auto;
                    font-family: "Inter", serif;
                }
                .peoplePlusAI-widget.full-screen .incoming-msg-text {
                    font-size: 16px;
                    line-height: 1.5em;
                }
                .peoplePlusAI-widget .outgoing-msg {
                    display: flex;
                    float: right;
                    width: 75%;
                    justify-content: end;
                    margin-bottom: 1rem;
                }

                .peoplePlusAI-widget .incoming-msg-text a {
                    color: #1255D0 !important;
                    font-weight: 500 !important;
                    text-decoration: underline !important;
                }
                .peoplePlusAI-widget.full-screen .incoming-msg-text a {
                    font-size: 16px;
                    line-height: 1.5em;
                    color: #1255D0 !important;
                    font-weight: 500 !important;
                    text-decoration: underline !important;
                }

                .peoplePlusAI-widget .incoming-msg-text ol, 
                .peoplePlusAI-widget .incoming-msg-text ul{
                    margin-left:15px
                }

                .peoplePlusAI-widget .incoming-timeFontSize {
                    float: right;
                    margin-top: 30px;
                }
                .peoplePlusAI-widget .placeholder-msg-time {
                    float: right;
                    margin-top: 30px;
                    font-size: 12px;
                    font-family: "Inter", serif;
                    color: rgba(0, 0, 0, 0.45);
                }
                .peoplePlusAI-widget.full-screen .placeholder-msg-time {
                    font-size: 14px;
                }
                .peoplePlusAI-widget .incoming-msg-time {
                    float: right;
                    margin-top: 30px;
                    font-size: 12px;
                    font-family: "Inter", serif;
                    color: rgba(0, 0, 0, 0.45);
                }
                .peoplePlusAI-widget.full-screen .incoming-msg-time {
                    font-size: 14px;
                }
                .peoplePlusAI-widget .outgoing-msg-time {
                    float: right;
                    margin-top: 30px;
                    font-size: 12px;
                    font-family: "Inter", serif;
                    color: rgba(0, 0, 0, 0.45);
                }
                .peoplePlusAI-widget.full-screen .outgoing-msg-time {
                     font-size: 14px;
                }
                .peoplePlusAI-widget .message-seen-icon {
                    float: right;
                    margin-top: 30px;
                    margin-right: 8px;
                }
                .peoplePlusAI-widget .outgoing-msg-text {
                    line-height: 1.5em;
                    margin-right: 10px;
                    background: var(--outgoing-msg-bg) !important;
                    color: var(--outgoing-msg-text) !important;
                    padding: 10px;
                    padding-left : 18px;
                    padding-right : 18px;
                    border-radius: 16px 16px 0px 16px;
                    font-size: 14px;
                    word-wrap: break-word;
                    word-break: break-word;
                    max-width: 100%;
                    font-family: "Inter", serif;
                }
                .peoplePlusAI-widget.full-screen .outgoing-msg-text {
                    font-size: 16px;
                    line-height: 1.5em;
                }
                .d-none {
                    display: none;
                }


                /* media-queries */


                 @media (max-height:800px) {
                    .peoplePlusAI-widget {
                        position: fixed;
                        bottom: 121px;
                        right: 40px;
                        background-color: #fff;
                        width: 420px;
                        height:550px;
                        border-radius: 15px;
                        overflow: hidden;
                        transform: scale(0.5);
                        opacity: 0;
                        transition: all 0.2s linear;
                        border: 1px solid rgb(228, 228, 228);
                        z-index: 1000
                    }
                    .peoplePlusAI-widget.full-screen {
                        position: fixed;
                        bottom: 121px;
                        right: 40px;
                        background-color: #fff;
                        width: 88%;
                        height:550px;
                        border-radius: 15px;
                        overflow: hidden;
                        transform: scale(0.5);
                        opacity: 0;
                        transition: all 0.2s linear;
                        border: 1px solid rgb(228, 228, 228);
                        z-index: 1000
                    }
                    .peoplePlusAI-widget .MR-chat-container{
                      height: 80%;
                    }
                    .peoplePlusAI-widget .peoplePlusAI-chatbox-container {
                        padding: 15px 20px 70px;
                        overflow-y: scroll;
                        background: url("https://d1olhs2thomfrd.cloudfront.net/chatBackground.png");
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        height: 100%;
                    }
                    .MR-show-chatbot .peoplePlusAI-widget {
                        transform: scale(1);
                        opacity: 1;
                        transition: all 0.2s linear;
                    }

                }

                 @media (max-height:680px) {
                    .peoplePlusAI-widget {
                        position: fixed;
                        bottom: 121px;
                        right: 40px;
                        background-color: #fff;
                        width: 420px;
                        height:400px;
                        border-radius: 15px;
                        overflow: hidden;
                        transform: scale(0.5);
                        opacity: 0;
                        transition: all 0.2s linear;
                        border: 1px solid rgb(228, 228, 228);
                        z-index: 1000
                    }
                    .peoplePlusAI-widget.full-screen {
                        position: fixed;
                        bottom: 121px;
                        right: 40px;
                        background-color: #fff;
                        width: 88%;
                        height:400px;
                        border-radius: 15px;
                        overflow: hidden;
                        transform: scale(0.5);
                        opacity: 0;
                        transition: all 0.2s linear;
                        border: 1px solid rgb(228, 228, 228);
                        z-index: 1000
                    }
                    .peoplePlusAI-widget .MR-chat-container{
                       height: 80%;
                    }
                    .peoplePlusAI-widget .peoplePlusAI-chatbox-container {
                        height: 100%;
                        padding: 15px 20px 70px;
                        overflow-y: scroll;
                        background: url("https://d1olhs2thomfrd.cloudfront.net/chatBackground.png");
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                    .MR-show-chatbot .peoplePlusAI-widget {
                        transform: scale(1);
                        opacity: 1;
                        transition: all 0.2s linear;
                    }

                }

                @media (max-width:490px){
                    .peoplePlusAI-widget {
                        width: 90%;
                        height: 90%;
                        bottom: 0px;
                        right: 10px;
                        z-index: 1;
                    }
                    .peoplePlusAI-widget.full-screen {
                        width: 100%;
                        height: 100%;
                        bottom: 0;
                        right: 0;
                        z-index: 1;
                    }
                  
                    .peoplePlusAI-widget .MR-header {
                        background-color: var(--overall-theme);
                        text-align: center;
                        position: relative;
                        height:68px;
                        display: flex;
                        align-items:center;
                        justify-content:space-between;
                        padding : 0 0 0 20px;
                    }
                    .peoplePlusAI-widget .MR-header .close-icon {
                        font-size:20px;
                        opacity:90%;
                        display: block;
                    }
                    .peoplePlusAI-widget {
                        opacity: 0 !important;
                    }
                    .MR-show-chatbot .peoplePlusAI-widget {
                        opacity: 1 !important;
                    }
                    .MR-show-chatbot .peoplePlusAI-widget-toggler {
                        position: fixed;
                        bottom: 100px;
                        right: 35px;
                        background-color: var(--overall-theme);
                        color: #fff;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        z-index :999;
                    }
                    .peoplePlusAI-widget .MR-header .full-screen-icon.show {
                        position: absolute;
                        right: 55px;
                        width: 50px; 
                        height: 50px; 
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor:pointer;
                    }
                    .peoplePlusAI-widget .MR-header .minimized-screen-icon.show {
                        position: absolute;
                        right: 55px;
                        width: 50px; 
                        height: 50px; 
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor:pointer;
                    }
                } 
                `;
            document.head.appendChild(styleTag);
        },

        renderChatWidget: function (client_id, client_secret, domain, containerId) {
            let container = document.getElementById(containerId);
            if (!container) {
                container = document.createElement("div");
                container.id = containerId;
                document.body.appendChild(container);
            }

            container.innerHTML = `
                        <div id="peoplePlusAI-widget-section" class="peoplePlusAI-widget-section">
                            <div class="peoplePlusAI-widget" id="peoplePlusAI-widget">
                                <header class="MR-header">
                                  <div>
                                    <p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="126" height="27" viewBox="0 0 126 27" fill="none">
                                            <path d="M95.9248 15.9234H101.417V13.574H95.9248V15.9234Z" fill="#D6D9D9"/>
                                            <path d="M95.0898 7.24448H92.7405V12.7372H95.0898V7.24448ZM95.0898 15.9231H92.7405V13.5738H95.0898V15.9231ZM91.9038 13.5738H86.4111V15.9231H91.9038V13.5738Z" fill="white"/>
                                            <path d="M92.75 22H95.0112L95 16.795H92.75V22ZM123.75 4.2263H121.489V2H123.75V4.2263Z" fill="#D6D9D9"/>
                                            <path d="M30.9834 14.0951C30.9834 11.0139 31.7833 8.78351 33.4179 7.54105V14.0951C33.4179 17.6697 34.371 20.0705 37.3161 20.0705C38.797 20.0705 39.7678 19.4575 40.3807 18.385V21.2111C39.5635 21.6876 38.542 21.9258 37.3161 21.9258C32.9754 21.9258 30.9834 19.0659 30.9834 14.0951Z" fill="white"/>
                                            <path d="M23.5265 20.003C20.7586 20.003 19.0286 18.7096 18.7495 15.9177H16.2822C16.8374 20.3138 19.4838 21.8926 23.2543 21.8926C25.5694 21.8926 27.1016 21.2968 27.7483 21.0246L27.5951 19.0665C26.829 19.4072 25.3824 20.003 23.5265 20.003Z" fill="white"/>
                                            <path d="M75.3256 20.003C72.2953 20.003 70.508 18.454 70.508 15.083H73.7933V13.2448H70.4737V7.42264C68.7035 8.76742 67.9717 11.1677 67.9717 14.0785C67.9717 19.884 70.7973 21.8926 75.0534 21.8926C77.3685 21.8926 78.9003 21.2968 79.5474 21.0246L79.3942 19.0665C78.6281 19.4072 77.181 20.003 75.3256 20.003Z" fill="white"/>
                                            <path d="M64.57 19.798V15.0823H62.2207V21.6534H65.9148V19.798H64.57Z" fill="white"/>
                                            <path d="M53.4879 6.24694C51.9385 6.24694 50.815 6.70662 50.0322 7.33666V9.63458C50.6109 8.68095 51.5131 8.11944 52.9259 8.11944C55.871 8.11944 56.8247 10.4859 56.8247 14.0606C56.8247 16.7535 56.2832 18.7602 54.7578 19.5865V21.743C57.3734 21.2432 59.242 19.0343 59.242 14.0606C59.242 8.32358 56.7566 6.24694 53.4879 6.24694Z" fill="white"/>
                                            <path d="M117.862 19.798V13.0227C117.862 10.435 117.862 6.24744 111.7 6.24744C109.589 6.24744 107.785 6.7409 107.223 6.94504L107.359 8.81804C108.074 8.59628 109.589 8.11995 111.513 8.11995C113.93 8.11995 115.581 8.86895 115.513 12.5288L115.529 14.2486H115.53V21.6534H119.207V19.798H117.862Z" fill="white"/>
                                            <path d="M122.306 14.2487H124.655V6.46884H120.791V8.32422H122.306V14.2487Z" fill="white"/>
                                            <path d="M8.59004 19.8963C8.28652 19.9662 7.95412 20.0014 7.59284 20.0021C4.66438 20.0021 3.86446 17.6356 3.86446 14.0605V6.46813H0V8.32351H1.51514V26.7431H3.86446V19.8655C4.52829 20.9043 5.92447 21.8575 8.17148 21.8575C8.31247 21.8568 8.45199 21.8524 8.59004 21.8442V19.8963Z" fill="white"/>
                                            <path d="M37.3155 8.10255C35.8175 8.10255 34.8472 8.71546 34.251 9.78805V6.96191C35.0682 6.48542 36.0897 6.24718 37.3155 6.24718C41.6563 6.24718 43.6483 9.1071 43.6483 14.0951C43.6483 17.1591 42.8484 19.4066 41.2138 20.6491V14.0951C41.2138 10.5028 40.2606 8.10255 37.3155 8.10255Z" fill="#D6D9D9"/>
                                            <path d="M22.5908 6.24716C21.3821 6.24716 20.3609 6.46843 19.5096 6.89385V9.54963C20.1563 8.54557 21.178 8.10253 22.5227 8.10253C24.9058 8.10253 26.1997 9.5834 26.1826 13.2437H18.6754V7.42158C16.9047 8.76635 16.1729 11.1671 16.1729 14.0779C16.1729 14.4265 16.1831 14.7615 16.2037 15.0829H18.7092L28.6171 15.0825C28.6342 14.7422 28.6513 14.2311 28.6513 13.6691C28.6513 8.69831 26.489 6.24716 22.5908 6.24716Z" fill="#D6D9D9"/>
                                            <path d="M74.3908 6.24715C73.1821 6.24715 72.1609 6.46843 71.3096 6.89384V9.54962C71.9563 8.54557 72.9779 8.10253 74.3227 8.10253C76.7058 8.10253 77.9997 9.5834 77.9825 13.2437H74.6292V15.0825H80.4171C80.4342 14.7422 80.4513 14.2311 80.4513 13.6691C80.4513 8.6983 78.289 6.24715 74.3908 6.24715Z" fill="#D6D9D9"/>
                                            <path d="M62.2202 14.2487H64.5695V9.53674e-07H60.7051V1.85538H62.2202V14.2487Z" fill="#D6D9D9"/>
                                            <path d="M53.923 19.8963C53.6195 19.9662 53.287 20.0014 52.9254 20.0021C49.9974 20.0021 49.1975 17.6356 49.1975 14.0605V6.46813H45.333V8.32351H46.8481V26.7431H49.1975V19.8655C49.8613 20.9043 51.257 21.8575 53.5045 21.8575C53.6455 21.8568 53.785 21.8524 53.923 21.8442V19.8963Z" fill="#D6D9D9"/>
                                            <path d="M111.633 20.0535C109.879 20.0535 108.552 19.3726 108.552 17.1422C108.552 14.1971 110.867 14.2485 112.859 14.2485H114.697V12.5288H112.416C109.216 12.5288 106.117 13.0227 106.117 17.1765C106.117 20.7854 108.535 21.8751 111.122 21.8751C112.739 21.8751 113.914 21.4326 114.697 20.8025V18.6916C114.135 19.492 113.199 20.0535 111.633 20.0535Z" fill="#D6D9D9"/>
                                            <path d="M124.655 15.0827H122.306V21.6539H126V19.7985H124.655V15.0827Z" fill="#D6D9D9"/>
                                            <path d="M8.15393 6.24694C6.60453 6.24694 5.48151 6.70662 4.69824 7.33666V9.63458C5.27688 8.68095 6.17911 8.11944 7.59243 8.11944C10.537 8.11944 11.4907 10.4859 11.4907 14.0606C11.4907 16.7535 10.9492 18.7602 9.42381 19.5865V21.743C12.0394 21.2432 13.908 19.0343 13.908 14.0606C13.908 8.32358 11.4226 6.24694 8.15393 6.24694Z" fill="#D6D9D9"/>
                                        </svg>
                                    </p>
                                  </div>
                            
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="98" height="68" viewBox="0 0 98 68" fill="none">
                                    <path opacity="0.5" d="M49.5363 46.5363L49.5363 47.0726L72.9274 47.0726L72.9274 69.9274L50.0726 69.9274L50.0726 46.5363L49.5363 46.5363ZM49 46.5363L49 71L74 71L74 46L49 46L49 46.5363Z" fill="#E8F2F2"/>
                                    <path opacity="0.5" d="M24.5259 21.526L24.5259 22.0519L48.9485 22.0519L48.9485 45.9481L25.0519 45.9481L25.0519 21.526L24.5259 21.526ZM24 21.526L24 47L50 47L50 21L24 21L24 21.526Z" fill="#66A682"/>
                                    <path opacity="0.5" d="M73.5363 21.526L73.5363 22.0519L96.9274 22.0519L96.9274 45.9481L74.0726 45.9481L74.0726 21.526L73.5363 21.526ZM73 21.526L73 47L98 47L98 21L73 21L73 21.526Z" fill="#B5D4D9"/>
                                    <path opacity="0.5" d="M0.536289 -2.4637L0.536289 -1.9274L23.9274 -1.9274L23.9274 20.9278L1.07258 20.9278L1.07258 -2.4637L0.536289 -2.4637ZM4.68846e-08 -2.4637L2.18557e-06 22L25 22L25 -3L0 -3L4.68846e-08 -2.4637Z" fill="#66A682"/>
                                    </svg>
                                </div>

                                <div id="full-screen-icon" class="full-screen-icon show">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path opacity="0.2" d="M23.3998 9H30.5998C31.0772 9 31.535 9.18964 31.8726 9.52721C32.2102 9.86477 32.3998 10.3226 32.3998 10.8V18C32.3998 18.4774 32.2102 18.9352 31.8726 19.2728C31.535 19.6104 31.0772 19.8 30.5998 19.8H23.3998C22.9224 19.8 22.4646 19.6104 22.127 19.2728C21.7894 18.9352 21.5998 18.4774 21.5998 18V10.8C21.5998 10.3226 21.7894 9.86477 22.127 9.52721C22.4646 9.18964 22.9224 9 23.3998 9ZM12.5998 19.8H19.7998C20.2772 19.8 20.735 19.9896 21.0726 20.3272C21.4102 20.6648 21.5998 21.1226 21.5998 21.6V28.8C21.5998 29.2774 21.4102 29.7352 21.0726 30.0728C20.735 30.4104 20.2772 30.6 19.7998 30.6H12.5998C12.1224 30.6 11.6646 30.4104 11.327 30.0728C10.9894 29.7352 10.7998 29.2774 10.7998 28.8V21.6C10.7998 21.1226 10.9894 20.6648 11.327 20.3272C11.6646 19.9896 12.1224 19.8 12.5998 19.8Z" fill="white"/>
                                        <path d="M20.437 16.8372C20.268 17.0062 20.0388 17.1011 19.7998 17.1011C19.5608 17.1011 19.3316 17.0062 19.1626 16.8372C18.9936 16.6682 18.8986 16.439 18.8986 16.2C18.8986 15.961 18.9936 15.7318 19.1626 15.5628L26.3626 8.3628C26.4462 8.27912 26.5456 8.21274 26.6549 8.16746C26.7643 8.12217 26.8814 8.09886 26.9998 8.09886C27.1181 8.09886 27.2353 8.12217 27.3446 8.16746C27.454 8.21274 27.5533 8.27912 27.637 8.3628C27.7206 8.44648 27.787 8.54582 27.8323 8.65515C27.8776 8.76448 27.9009 8.88166 27.9009 9C27.9009 9.11834 27.8776 9.23552 27.8323 9.34485C27.787 9.45418 27.7206 9.55352 27.637 9.6372L20.437 16.8372ZM9.63697 27.6372C9.55329 27.7209 9.45395 27.7873 9.34462 27.8325C9.23529 27.8778 9.11811 27.9011 8.99977 27.9011C8.88143 27.9011 8.76425 27.8778 8.65492 27.8325C8.54559 27.7873 8.44625 27.7209 8.36257 27.6372C8.27889 27.5535 8.21251 27.4542 8.16723 27.3449C8.12194 27.2355 8.09863 27.1183 8.09863 27C8.09863 26.8817 8.12194 26.7645 8.16723 26.6551C8.21251 26.5458 8.27889 26.4465 8.36257 26.3628L15.5626 19.1628C15.7316 18.9938 15.9608 18.8989 16.1998 18.8989C16.4388 18.8989 16.668 18.9938 16.837 19.1628C17.006 19.3318 17.1009 19.561 17.1009 19.8C17.1009 20.039 17.006 20.2682 16.837 20.4372L9.63697 27.6372Z" fill="white"/>
                                        <path d="M8.99961 27.9C8.76091 27.9 8.532 27.8052 8.36321 27.6364C8.19443 27.4676 8.09961 27.2387 8.09961 27C8.09961 26.7613 8.19443 26.5324 8.36321 26.3636C8.532 26.1948 8.76091 26.1 8.99961 26.1H16.1996C16.4383 26.1 16.6672 26.1948 16.836 26.3636C17.0048 26.5324 17.0996 26.7613 17.0996 27C17.0996 27.2387 17.0048 27.4676 16.836 27.6364C16.6672 27.8052 16.4383 27.9 16.1996 27.9H8.99961Z" fill="white"/>
                                        <path d="M9.89961 27C9.89961 27.2387 9.80479 27.4676 9.63601 27.6364C9.46722 27.8052 9.2383 27.9 8.99961 27.9C8.76091 27.9 8.532 27.8052 8.36321 27.6364C8.19443 27.4676 8.09961 27.2387 8.09961 27V19.8C8.09961 19.5613 8.19443 19.3324 8.36321 19.1636C8.532 18.9949 8.76091 18.9 8.99961 18.9C9.2383 18.9 9.46722 18.9949 9.63601 19.1636C9.80479 19.3324 9.89961 19.5613 9.89961 19.8V27ZM27.8996 16.2C27.8996 16.4387 27.8048 16.6677 27.636 16.8364C27.4672 17.0052 27.2383 17.1 26.9996 17.1C26.7609 17.1 26.532 17.0052 26.3632 16.8364C26.1944 16.6677 26.0996 16.4387 26.0996 16.2V9.00004C26.0996 8.76134 26.1944 8.53242 26.3632 8.36364C26.532 8.19486 26.7609 8.10004 26.9996 8.10004C27.2383 8.10004 27.4672 8.19486 27.636 8.36364C27.8048 8.53242 27.8996 8.76134 27.8996 9.00004V16.2Z" fill="white"/>
                                        <path d="M19.7994 9.90001C19.5607 9.90001 19.3318 9.80518 19.163 9.6364C18.9942 9.46762 18.8994 9.2387 18.8994 9.00001C18.8994 8.76131 18.9942 8.53239 19.163 8.36361C19.3318 8.19483 19.5607 8.10001 19.7994 8.10001H26.9994C27.2381 8.10001 27.467 8.19483 27.6358 8.36361C27.8046 8.53239 27.8994 8.76131 27.8994 9.00001C27.8994 9.2387 27.8046 9.46762 27.6358 9.6364C27.467 9.80518 27.2381 9.90001 26.9994 9.90001H19.7994Z" fill="white"/>
                                    </svg>
                                </div>

                                <div id="minimized-screen-icon" class="minimized-screen-icon">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path opacity="0.2" d="M22.1532 2.76904H33.2296C33.964 2.76904 34.6683 3.06079 35.1876 3.58009C35.7069 4.0994 35.9987 4.80373 35.9987 5.53814V16.6145C35.9987 17.3489 35.7069 18.0533 35.1876 18.5726C34.6683 19.0919 33.964 19.3836 33.2296 19.3836H22.1532C21.4188 19.3836 20.7145 19.0919 20.1952 18.5726C19.6759 18.0533 19.3841 17.3489 19.3841 16.6145V5.53814C19.3841 4.80373 19.6759 4.0994 20.1952 3.58009C20.7145 3.06079 21.4188 2.76904 22.1532 2.76904ZM5.53863 19.3836H16.615C17.3494 19.3836 18.0538 19.6754 18.5731 20.1947C19.0924 20.714 19.3841 21.4183 19.3841 22.1527V33.2291C19.3841 33.9635 19.0924 34.6678 18.5731 35.1872C18.0538 35.7065 17.3494 35.9982 16.615 35.9982H5.53863C4.80422 35.9982 4.09989 35.7065 3.58058 35.1872C3.06128 34.6678 2.76953 33.9635 2.76953 33.2291V22.1527C2.76953 21.4183 3.06128 20.714 3.58058 20.1947C4.09989 19.6754 4.80422 19.3836 5.53863 19.3836Z" fill="white"/>
                                        <path d="M18.9811 13.4429C18.7212 13.7029 18.3685 13.849 18.0009 13.849C17.6332 13.849 17.2806 13.7029 17.0206 13.4429C16.7606 13.183 16.6146 12.8304 16.6146 12.4627C16.6146 12.095 16.7606 11.7424 17.0206 11.4824L28.097 0.406037C28.2257 0.277308 28.3786 0.175194 28.5467 0.105526C28.7149 0.0358577 28.8952 0 29.0773 0C29.2593 0 29.4396 0.0358577 29.6078 0.105526C29.776 0.175194 29.9288 0.277308 30.0575 0.406037C30.1863 0.534767 30.2884 0.687591 30.358 0.855784C30.4277 1.02398 30.4636 1.20425 30.4636 1.3863C30.4636 1.56835 30.4277 1.74862 30.358 1.91681C30.2884 2.085 30.1863 2.23783 30.0575 2.36656L18.9811 13.4429ZM2.36656 30.0575C2.23783 30.1863 2.085 30.2884 1.91681 30.358C1.74862 30.4277 1.56835 30.4636 1.3863 30.4636C1.20425 30.4636 1.02398 30.4277 0.855784 30.358C0.687591 30.2884 0.534767 30.1863 0.406037 30.0575C0.277308 29.9288 0.175194 29.776 0.105526 29.6078C0.0358577 29.4396 0 29.2593 0 29.0773C0 28.8952 0.0358577 28.7149 0.105526 28.5467C0.175194 28.3786 0.277308 28.2257 0.406037 28.097L11.4824 17.0206C11.7424 16.7606 12.095 16.6146 12.4627 16.6146C12.8304 16.6146 13.183 16.7606 13.4429 17.0206C13.7029 17.2806 13.849 17.6332 13.849 18.0009C13.849 18.3685 13.7029 18.7212 13.4429 18.9811L2.36656 30.0575Z" fill="white"/>
                                        <path d="M12.4612 16.6585C12.8284 16.6585 13.1805 16.8044 13.4402 17.064C13.6998 17.3237 13.8457 17.6759 13.8457 18.0431C13.8457 18.4103 13.6998 18.7624 13.4402 19.0221C13.1805 19.2817 12.8284 19.4276 12.4612 19.4276L1.38477 19.4276C1.01756 19.4276 0.665398 19.2817 0.405745 19.0221C0.146091 18.7624 0.000221164 18.4103 0.000221131 18.0431C0.000221099 17.6759 0.146091 17.3237 0.405744 17.064C0.665397 16.8044 1.01756 16.6585 1.38477 16.6585L12.4612 16.6585Z" fill="white"/>
                                        <path d="M18.0271 13.8508C17.6599 13.8508 17.3078 13.7049 17.0481 13.4452C16.7885 13.1856 16.6426 12.8334 16.6426 12.4662C16.6426 12.099 16.7885 11.7468 17.0481 11.4872C17.3078 11.2275 17.6599 11.0817 18.0271 11.0817L29.1035 11.0817C29.4707 11.0817 29.8229 11.2275 30.0825 11.4872C30.3422 11.7468 30.4881 12.099 30.4881 12.4662C30.4881 12.8334 30.3422 13.1856 30.0825 13.4452C29.8229 13.7049 29.4707 13.8508 29.1035 13.8508L18.0271 13.8508Z" fill="white"/>
                                        <path d="M13.644 29.1248C13.6371 29.4919 13.4847 29.8413 13.2203 30.0961C12.9559 30.3509 12.6011 30.4902 12.2339 30.4834C11.8668 30.4766 11.5174 30.3242 11.2626 30.0597C11.0078 29.7953 10.8685 29.4405 10.8753 29.0733L11.0812 17.9989C11.0881 17.6317 11.2405 17.2823 11.5049 17.0275C11.7693 16.7728 12.1242 16.6335 12.4913 16.6403C12.8584 16.6471 13.2078 16.7995 13.4626 17.0639C13.7174 17.3284 13.8567 17.6832 13.8499 18.0503L13.644 29.1248Z" fill="white"/>
                                        <path d="M16.8443 1.38435C16.8511 1.01721 17.0035 0.667812 17.268 0.41303C17.5324 0.158249 17.8872 0.01895 18.2544 0.025776C18.6215 0.0326021 18.9709 0.184994 19.2257 0.449429C19.4805 0.713864 19.6198 1.06868 19.6129 1.43582L19.407 12.5103C19.4002 12.8774 19.2478 13.2268 18.9834 13.4816C18.7189 13.7364 18.3641 13.8757 17.997 13.8689C17.6298 13.862 17.2805 13.7096 17.0257 13.4452C16.7709 13.1808 16.6316 12.826 16.6384 12.4588L16.8443 1.38435Z" fill="white"/>
                                    </svg>
                                </div>
                            

                                <p class="MR close-icon peoplePlusAI-widget-close-icon">✖</p>
                                </header>
                                <div class="MR-chat-container" id="MR-chat-container">
                                <ul class="peoplePlusAI-chatbox-container" id="peoplePlusAI-chatbox-container">
                                    <div class="d-flex incoming-msg" id="incoming-msg-box">
                        
                                    </div>
                                </ul>
                                </div>
                                <div class="MR-chat-input">
                                    <textarea class="MR-userInputText" id="MR-userInputText" placeholder="Type your message.." required=""></textarea>
                                    <span id="MR-send-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#26758A">
                                            <g clip-path="url(#clip0_141_13959)">
                                                <path d="M15.4126 0.587969C15.1736 0.346054 14.8762 0.169872 14.5492 0.0764462C14.2222 -0.0169797 13.8767 -0.0244919 13.5459 0.0546353L2.87926 2.3013C2.26498 2.38555 1.68641 2.63962 1.20873 3.03491C0.73104 3.4302 0.373201 3.95101 0.175509 4.53868C-0.0221834 5.12635 -0.0518764 5.75754 0.0897735 6.36118C0.231423 6.96481 0.53879 7.51691 0.977259 7.9553L2.12259 9.09997C2.18458 9.16194 2.23374 9.23553 2.26726 9.31652C2.30078 9.39751 2.31799 9.48432 2.31793 9.57197V11.684C2.3194 11.9809 2.38776 12.2737 2.51793 12.5406L2.51259 12.5453L2.52993 12.5626C2.72527 12.9554 3.04431 13.273 3.43793 13.4666L3.45526 13.484L3.45993 13.4786C3.72683 13.6088 4.01964 13.6772 4.31659 13.6786H6.42859C6.60529 13.6785 6.77482 13.7485 6.89993 13.8733L8.04459 15.018C8.35161 15.3284 8.71702 15.575 9.11978 15.7435C9.52253 15.912 9.95466 15.9992 10.3913 16C10.7551 15.9995 11.1164 15.9401 11.4613 15.824C12.0436 15.6328 12.5608 15.2826 12.9547 14.8131C13.3487 14.3436 13.6035 13.7733 13.6906 13.1666L15.9406 2.47664C16.0238 2.14306 16.0189 1.79358 15.9264 1.46248C15.8338 1.13137 15.6567 0.830015 15.4126 0.587969ZM3.06659 8.15864L1.92059 7.01397C1.65374 6.75354 1.46671 6.4224 1.38145 6.05941C1.29619 5.69641 1.31625 5.31663 1.43926 4.96464C1.55852 4.60352 1.779 4.28425 2.07446 4.04481C2.36992 3.80537 2.72793 3.65583 3.10593 3.61397L13.6666 1.39064L3.64993 11.4086V9.57197C3.65093 9.30953 3.5999 9.04949 3.49977 8.80689C3.39965 8.5643 3.25241 8.34397 3.06659 8.15864ZM12.3806 12.9386C12.3294 13.3069 12.1766 13.6535 11.9393 13.9397C11.7021 14.2259 11.3897 14.4403 11.0373 14.5589C10.685 14.6774 10.3066 14.6954 9.94455 14.6108C9.58254 14.5262 9.25127 14.3424 8.98793 14.08L7.84126 12.9333C7.65617 12.7472 7.43602 12.5996 7.19354 12.4992C6.95106 12.3987 6.69106 12.3473 6.42859 12.348H4.59193L14.6099 2.3333L12.3806 12.9386Z" fill="#26758A"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_141_13959">
                                                <rect width="16" height="16" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="peoplePlusAI-widget-toggler">
                                <p class="message-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" viewBox="0 0 124 124" fill="none">
                                <g filter="url(#filter0_dd_288_17550)">
                                    <rect x="32" y="30" width="60" height="60" rx="30" fill="#005C75"/>
                                    <path d="M65.4102 40.1246H59.0773V54.9046H65.4102V40.1246ZM65.4102 63.4763H59.0773V57.1551H65.4102V63.4763ZM56.8219 57.1551H42.0137V63.4763H56.8219V57.1551Z" fill="white"/>
                                    <path d="M59.0478 40H65.3807V54.78H59.0478V40ZM59.0478 63.3517H65.3807V57.0305H59.0478V63.3517ZM67.6361 57.0305H82.4443V63.3517H67.6361V57.0305Z" fill="white"/>
                                    <path d="M59.0478 80.3853H65.3807V65.6053H59.0478V80.3853ZM67.6361 63.3548H82.4443V57.0336H67.6361V63.3548Z" fill="#D6D9D9"/>
                                </g>
                                <defs>
                                    <filter id="filter0_dd_288_17550" x="0" y="0" width="124" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="3"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_288_17550"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="2"/>
                                    <feGaussianBlur stdDeviation="16"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                                    <feBlend mode="normal" in2="effect1_dropShadow_288_17550" result="effect2_dropShadow_288_17550"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_288_17550" result="shape"/>
                                    </filter>
                                </defs>
                                </svg>
                                </p>
                                <p class="close-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" viewBox="0 0 124 124" fill="none">
                                        <g filter="url(#filter0_dd_176_14003)">
                                            <rect x="32" y="30" width="60" height="60" rx="30" fill="#005C75"/>
                                            <path d="M62 67.5934L51.4062 56.9997L53 55.4059L53.7969 56.2028L62 64.4528L71 55.4528L72.5938 56.9997L62 67.5934Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <filter id="filter0_dd_176_14003" x="0" y="0" width="124" height="124" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="1"/>
                                            <feGaussianBlur stdDeviation="3"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_176_14003"/>
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            <feOffset dy="2"/>
                                            <feGaussianBlur stdDeviation="16"/>
                                            <feComposite in2="hardAlpha" operator="out"/>
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
                                            <feBlend mode="normal" in2="effect1_dropShadow_176_14003" result="effect2_dropShadow_176_14003"/>
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_176_14003" result="shape"/>
                                            </filter>
                                        </defs>
                                    </svg>
                                </p>
                            </div>
                        </div>`;

            this.initializeChatLogic(client_id, client_secret, domain, container);
        },

        initializeChatLogic: function (client_id, client_secret, domain, container) {



            let timerRef = null;
            let randomNumber = null;
            let apiToken;
            let apiResponseMessage;

            const MRChatbotSection = document.getElementById('peoplePlusAI-widget-section')
            MRChatbotSection.className = "peoplePlusAI-widget-section"
            const peoplePlusAIWidget = document.getElementById('peoplePlusAI-widget')
            const MRChatboxUl = document.getElementById("peoplePlusAI-chatbox-container")
            const MRUserInputText = document.getElementById("MR-userInputText")
            const MRSendbtnSpan = document.getElementById("MR-send-btn")

            const toggler = document.querySelector(".peoplePlusAI-widget-toggler");
            const chatBotCloseIcon = document.querySelector(".peoplePlusAI-widget-close-icon");

            const incomingMsgBox = document.getElementById("incoming-msg-box");
            incomingMsgBox.className = "d-flex placeholder-msg";
            const botIcon = document.createElement("img");
            botIcon.className = "bot-icon";
            botIcon.setAttribute(
                "src",
                "https://d1olhs2thomfrd.cloudfront.net/bot-icon.png"
            );
            const incomingMsgText = document.createElement("p");
            incomingMsgText.className = "placeholder-msg-text";
            incomingMsgText.innerHTML =
                `  Hello! This prototype has been trained on some RBI circulars on two topics: <br>
                1) Credit facilities to minority communities <br>
                2) Investments by Foreign Portfolio Investors. <br><br>
                If you have any queries on either, type in the chat, and I will fetch you the most relevant information.`;
            const incomingMsgTime = document.createElement("i");
            incomingMsgTime.className = "placeholder-msg-time";
            incomingMsgTime.innerText = formatAMPM(new Date());
            incomingMsgText.append(incomingMsgTime);
            const bottomChat = document.createElement("div");
            incomingMsgBox.append(botIcon, incomingMsgText, bottomChat);
            MRChatboxUl.append(incomingMsgBox);

            const fullscreenIcon = document.getElementById("full-screen-icon");
            fullscreenIcon.addEventListener('click', () => {
                peoplePlusAIWidget.classList.add("full-screen");
                fullscreenIcon.classList.remove("show");
                minimizedScreenIcon.classList.add("show");
            })

            const minimizedScreenIcon = document.getElementById("minimized-screen-icon");
            minimizedScreenIcon.addEventListener('click', () => {
                peoplePlusAIWidget.classList.remove("full-screen");
                fullscreenIcon.classList.add("show");
                minimizedScreenIcon.classList.remove("show");
            })

            const randomNumberGenerate = () => {
                return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
            }

            function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? "pm" : "am";
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                var strTime = hours + ":" + minutes + " " + ampm;
                return strTime;
            }

            const welcomeMessage = async () => {
                toggler.style.pointerEvents = "none"
                toggler.style.opacity = "0.5"
                await generateToken(client_id, client_secret, domain);
            };

            const generateToken = async (client_id, client_secret, domain) => {
                const url = "https://jsonplaceholder.typicode.com/users";
                const username = client_id;
                const password = client_secret;
                const base64Credentials = btoa(`${username}:${password}`);

                fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${base64Credentials}`,
                        domain: domain
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (data.error_code === 200) {
                            apiToken = data.data.token;
                            (async () => {
                                await getResponse("init", "", domain);
                            })();
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            };

            const getResponse = async (flag, userInputTextValue, domain) => {

                toggler.style.pointerEvents = "none"
                toggler.style.opacity = "0.5"
                MRUserInputText.blur()
                MRUserInputText.style.pointerEvents = "none"
                MRUserInputText.style.opacity = "0.9"

                if (userInputTextValue) {
                    var incomingMsgBox2 = document.createElement("div");
                    incomingMsgBox2.className = "d-flex placeholder-msg";
                    var botIcon2 = document.createElement("img");
                    botIcon2.className = "bot-icon";
                    botIcon2.setAttribute(
                        "src",
                        "https://d1olhs2thomfrd.cloudfront.net/bot-icon.png"
                    );
                    var incomingMsgText2 = document.createElement("p");
                    incomingMsgText2.className = "placeholder-msg-text";
                    incomingMsgText2.innerHTML = `Thinking...`;
                    var incomingMsgTime2 = document.createElement("i");
                    incomingMsgTime2.className = "placeholder-msg-time";
                    incomingMsgTime2.innerText = formatAMPM(new Date());
                    incomingMsgText2.append(incomingMsgTime2);
                    var bottomChat2 = document.createElement("div");
                    incomingMsgBox2.append(botIcon2, incomingMsgText2, bottomChat2);

                    MRChatboxUl.append(incomingMsgBox2);

                }
                var dataObject;
                let payload = {
                    "question": userInputTextValue.trim()
                }

                const url = 'https://fmcapi.adraproductstudio.com/selfRAG'

                setTimeout(async () => {
                    await fetch(url, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            dataObject = data
                            toggler.style.pointerEvents = "all"
                            toggler.style.opacity = "1"
                            MRUserInputText.focus();
                            MRUserInputText.style.pointerEvents = "all"
                            MRUserInputText.style.opacity = "1"
                            if (incomingMsgBox2) {
                                incomingMsgBox2.className = "d-none"
                            }

                            if (data.error_code === 200) {
                                apiResponseMessage = data.data.answer;
                            } else if (data.error_code === 500) {
                                console.error("Unexpected API response format:", data);
                                apiResponseMessage = "The circular related to your question is not in our database. We are in the process of adding more circulars.";
                            } else {
                                console.error("Unexpected API response format:", data);
                                apiResponseMessage = "Something went wrong.Please try again later!";
                            }
                        })
                        .catch((error) => {
                            apiResponseMessage = "Something went wrong.Please try again later!";
                            console.error("Error:", error);
                        });

                    if (dataObject === undefined) {
                        incomingMsgBox2.className = "d-none"
                        const incomingMsgBox = document.createElement("div");
                        incomingMsgBox.className = "d-flex incoming-msg";
                        const botIcon = document.createElement("img");
                        botIcon.className = "bot-icon";
                        botIcon.setAttribute(
                            "src",
                            "https://d1olhs2thomfrd.cloudfront.net/bot-icon.png"
                        );
                        const incomingMsgText = document.createElement("div");
                        incomingMsgText.className = "incoming-msg-text";
                        incomingMsgText.innerHTML = `Something went wrong.Please try again later!`;
                        let linkText = incomingMsgText.querySelector('a')
                        if (linkText) {
                            linkText.style.color = '#fff';
                            linkText.style.textDecoration = 'underline';
                        }
                        const incomingMsgTime = document.createElement("i");
                        incomingMsgTime.className = "incoming-msg-time";
                        incomingMsgTime.innerText = formatAMPM(new Date());
                        incomingMsgText.append(incomingMsgTime);
                        const bottomChat = document.createElement("div");
                        incomingMsgBox.append(botIcon, incomingMsgText, bottomChat);
                        MRChatboxUl.append(incomingMsgBox);
                        bottomChat.scrollIntoView({ behavior: "smooth" });
                        toggler.style.pointerEvents = "all"
                        toggler.style.opacity = "1"
                        MRUserInputText.focus();
                        MRUserInputText.style.pointerEvents = "all"
                        MRUserInputText.style.opacity = "1"
                    } else if (Object.keys(dataObject).length) {
                        const incomingMsgBox = document.createElement("div");
                        incomingMsgBox.className = "d-flex incoming-msg";
                        const botIcon = document.createElement("img");
                        botIcon.className = "bot-icon";
                        botIcon.setAttribute(
                            "src",
                            "https://d1olhs2thomfrd.cloudfront.net/bot-icon.png"
                        );
                        const incomingMsgText = document.createElement("div");
                        incomingMsgText.className = "incoming-msg-text";
                        incomingMsgText.innerHTML = apiResponseMessage.replace(/\n/g, "<br>");
                        let linkText = incomingMsgText.querySelector('a')
                        if (linkText) {
                            linkText.style.color = '#fff';
                            linkText.style.textDecoration = 'underline';
                        }
                        const incomingMsgTime = document.createElement("i");
                        incomingMsgTime.className = "incoming-msg-time";
                        incomingMsgTime.innerText = formatAMPM(new Date());
                        incomingMsgText.append(incomingMsgTime);
                        const bottomChat = document.createElement("div");
                        incomingMsgBox.append(botIcon, incomingMsgText, bottomChat);
                        MRChatboxUl.append(incomingMsgBox);
                        bottomChat.scrollIntoView({ behavior: "smooth" });
                    } else {
                        const incomingMsgBox = document.createElement("div");
                        incomingMsgBox.className = "d-flex incoming-msg";
                        const botIcon = document.createElement("img");
                        botIcon.className = "bot-icon";
                        botIcon.setAttribute(
                            "src",
                            "https://d1olhs2thomfrd.cloudfront.net/bot-icon.png"
                        );
                        const incomingMsgText = document.createElement("p");
                        incomingMsgText.className = "incoming-msg-text";
                        incomingMsgText.innerHTML = `Something went wrong.Please try again later!`;
                        const incomingMsgTime = document.createElement("i");
                        incomingMsgTime.className = "incoming-msg-time";
                        incomingMsgTime.innerText = formatAMPM(new Date());
                        incomingMsgText.append(incomingMsgTime);
                        const bottomChat = document.createElement("div");
                        incomingMsgBox.append(botIcon, incomingMsgText, bottomChat);
                        MRChatboxUl.append(incomingMsgBox);
                        bottomChat.scrollIntoView({ behavior: "smooth" });
                    }
                }, 2000);
            };

            const handleSendClick = () => {
                const outgoingMsgBox = document.createElement("div");
                outgoingMsgBox.className = "d-flex outgoing-msg";
                const outgoingMsgText = document.createElement("p");
                const userIcon = document.createElement("img");
                outgoingMsgText.className = "outgoing-msg-text";
                outgoingMsgText.innerText = MRUserInputText.value.trim();
                const outgoingMsgTime = document.createElement("i");
                outgoingMsgTime.className = "outgoing-msg-time";
                outgoingMsgTime.innerText = formatAMPM(new Date());
                const messageSeenIcon = document.createElement("i");
                messageSeenIcon.className = "message-seen-icon";
                messageSeenIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                             <path d="M5.801 6.88L6.507 7.586L10.74 3.353L11.447 4.06L6.507 9L3.325 5.818L4.032 5.111L5.0945 6.1735L5.801 6.8795V6.88ZM5.802 5.466L8.278 2.9895L8.983 3.6945L6.507 6.171L5.802 5.466ZM4.3885 8.2935L3.682 9L0.5 5.818L1.207 5.111L1.9135 5.8175L1.913 5.818L4.3885 8.2935Z" fill="#27AE60"/>
                                            </svg>`;
                outgoingMsgText.append(outgoingMsgTime, messageSeenIcon,);
                userIcon.id = "user-icon";
                userIcon.className = "user-icon";
                userIcon.setAttribute(
                    "src",
                    "https://d1olhs2thomfrd.cloudfront.net/user-icon.png"
                );
                outgoingMsgBox.append(outgoingMsgText, userIcon);
                const bottomChat = document.createElement("div");
                MRChatboxUl.append(outgoingMsgBox, bottomChat);
                bottomChat.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    getResponse("step", MRUserInputText.value, domain);
                    MRUserInputText.value = "";
                    bottomChat.scrollIntoView({ behavior: "smooth" });
                }, 0);
            }


            MRSendbtnSpan.addEventListener('click', handleSendClick)
            MRUserInputText.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && e.shiftKey) {
                    return;
                }
                if (e.key === "Enter") {
                    e.preventDefault();
                    if (MRUserInputText.value.trim() === "") {
                        return;
                    }
                    handleSendClick();
                }
            });


            const handleToggler = async () => {
                document.getElementById('MR-userInputText').focus();
                MRChatbotSection.classList.toggle("MR-show-chatbot");
                incomingMsgBox.className = "d-flex placeholder-msg";
                MRChatboxUl.append(incomingMsgBox);

                if (MRChatbotSection.className.includes("MR-show-chatbot")) {
                    // console.log("Chat opened")
                } else {
                    peoplePlusAIWidget.classList.remove("full-screen");
                    fullscreenIcon.classList.add("show");
                    minimizedScreenIcon.classList.remove("show");
                    MRChatboxUl.innerHTML = "";
                    MRUserInputText.value = ""
                    resetIdleTracking("close")
                }
            };

            const resetIdleTracking = (value) => {
                if (timerRef) {
                    clearTimeout(timerRef);
                }
                if (value === "close") {
                    // console.log("Chat closed")
                    startIdleTracking("close");
                } else {
                    startIdleTracking("continous")
                }
            };

            const startIdleTracking = (value) => {
                if (value === "close") {
                    MRChatboxUl.innerHTML = "";
                    return
                }
                timerRef = setTimeout(async () => {
                    const response = await getResponse("step", "", domain);
                    if (response) {
                        resetIdleTracking("continous");
                    }
                }, 5000);
            };

            toggler.addEventListener("click", handleToggler);
            chatBotCloseIcon.addEventListener("click", () => {
                MRChatbotSection.classList.toggle("MR-show-chatbot");
            });
        },
    };

    window.peoplePlusAI_widget = peoplePlusAI_widget;
})(window, document);



