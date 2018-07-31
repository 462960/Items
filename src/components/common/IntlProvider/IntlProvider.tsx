import React, { ReactNode } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';
import enLang from 'i18n/en.json';
import ruLang from 'i18n/ru.json';

const messages = {
  ...enLang,
  ...ruLang,
};

addLocaleData([...ru, ...en]);

interface IConnectedProps {
  defaultLang: string;
  lang?: string;
}

interface IProps extends IConnectedProps {
  children: ReactNode;
}

class ReactIntlProvider extends React.PureComponent<IProps> {
  render() {
    const { lang, children, defaultLang } = this.props;
    const currentLang = lang || defaultLang;
    // moment.locale(language); // TODO:

    return (
      <IntlProvider
        locale={currentLang}
        defaultLocale={defaultLang}
        messages={messages[currentLang]}
      >
        {children}
      </IntlProvider>
    );
  }
}

const enhance = connect<IConnectedProps>((state: IStore) => ({
  defaultLang: state.getIn(['locale', 'defaultLang']),
  lang: state.getIn(['locale', 'lang']),
}));

export default enhance(ReactIntlProvider);
