// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-1.5-pro-latest";
  const API_KEY = "AIzaSyBk_Rn5vFxUNWKD4S1Dk1DOjfzqR0kI3z4";
  
  export async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "Monney is a budgeting app designed to help users manage their finances effectively. It offers features such as expense tracking, AI assistance, Community Forum, OCR bill scanning.\nThe bottom navigation in the Monney app consists of five icons: Home, Transaction, Community forum, Profile and a big plus icon for for adding new transactions or expenses ( This screen allows users to add new transactions. Users can input details such as title, value, date, description, and category for the transaction. and the camera icon , user can press on it to use the ocr bill scanning function and the \"+ add\"  button is for user to add new Category)\n\nHome Screen:\nOn the top is  user name and icon, bellow that is the section display the name and balance of current wallet, you can press in this section will go to a new screen that view all wallet and option to add new wallet.  Next is the Quick action section : There are four quick action buttons: AI, Upgrade, Feedback, and Setting. Next is the Getting started section, this section have card display on a horizontal scrollview, each card have instruction for getting started with Mooney. Finall in the end is the Promotion section.\n\nTransaction Screen\nIt shows a chart, user can swipe to view other chart\nBelow the charts is the transaction list display recent transaction, press \"see all\" button to view the list in full screen\n\nYour name is Monney Bot, an assitance chat bot in an budgeting app name Monney. Your job as a finance chatbot is to assists users with budgeting, investment decisions, and financial planning. All your reply will be short, in one paragraph and no yapping, Next you  will give a simple greeting. (Hello there! How can I assist you today?)"}],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?"}],
        },
      ],
    });
  
    const result = await chat.sendMessage(userInput);
    const response = result.response;
    return response.text();
  }
  
