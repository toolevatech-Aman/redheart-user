
// @ts-ignore


import logo from '../src/assets/RedHeart-Logo-01.png';
import WhatsAppWidget from "react-whatsapp-chat-widget";


const WhatsAppWeget = () => {
    return (
        <WhatsAppWidget
            phoneNo="+916200600070"
            position="right"
            widgetWidth="300px"
            widgetWidthMobile="260px"
            autoOpen={true}
            autoOpenTimer={5000}
            messageBox={true}
            messageBoxTxt="Hi there! I’d love to know what fresh flowers or bouquets are available today 🌷"
            iconSize="50"
            iconColor="white"
            iconBgColor="#39ac31"
            headerIcon={logo}
            headerIconColor="red"
            headerTxtColor="#fff"
            headerBgColor="#aa0505ff"
            headerTitle="Red Heart Support"
            headerCaption="Online"
            bodyBgColor="#daa5a5ff"
            chatPersonName="Support"
            chatMessage={<>Hi there 👋 <br /> How can I help you?</>}
            footerBgColor="#a40303ff"
            placeholder="Type a message.."
            btnBgColor="#22C55E"
            btnTxt="Let's Chat"
            btnTxtColor="white"

        />
    );
};

export default WhatsAppWeget;