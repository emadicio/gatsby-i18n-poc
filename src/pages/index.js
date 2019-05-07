import React from "react"
import { navigate } from "gatsby"
import { FormattedMessage, withIntl } from "gatsby-plugin-intl"
import languages from "../../i18n/languages";

const IndexPage = ({ intl }) => (
    <div>
        <div className="title">
            <FormattedMessage id="hero.title" />
        </div>
        <div className="description">
            <FormattedMessage id="head.ogDescription" />
        </div>
        <div className="lang-picker">
            <select
                value={intl.locale}
                onChange={e => navigate(`/${e.target.value}`)}
            >
                {languages.map(lang => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>
    </div>
)

export default withIntl(IndexPage)
