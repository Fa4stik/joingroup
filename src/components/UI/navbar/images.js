import logo from './img/JoinGroupLogo.png';
import homeGray from './img/HomeGray.png';
import homeBlue from './img/HomeBlue.png';
import userChatGray from './img/MessageGray.png';
import userChatBlue from './img/MessageBlue.png';
import compChatGray from './img/GroupGray.png';
import compChatBlue from './img/GroupBlue.png';
import analysisGray from './img/AnalyticsGray.png';
import analysisBlue from './img/AnalyticsBlue.png';
import settingGray from './img/SettingsGray.png';
import settingBlue from './img/SettingsBlue.png';

const icons = {
    home: { gray: homeGray, blue: homeBlue },
    userChat: { gray: userChatGray, blue: userChatBlue },
    compChat: { gray: compChatGray, blue: compChatBlue },
    analysis: { gray: analysisGray, blue: analysisBlue },
    setting: { gray: settingGray, blue: settingBlue },
};

export const iconGray = {
    logo,
    ...Object.fromEntries(Object.entries(icons).map(([key, value]) => [key, value.gray])),
};

export const iconBlue = {
    ...Object.fromEntries(Object.entries(icons).map(([key, value]) => [key, value.blue])),
};
