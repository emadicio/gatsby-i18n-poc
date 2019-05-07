import React from "react"
import { navigate } from "gatsby"
import { withIntl } from "gatsby-plugin-intl"
import languages from "../../i18n/languages";

const IndexPage = ({ intl }) => {
	const { messages } = intl; 
	return (
		<div>
			<div className="title">
				{messages.hero.title}
			</div>
			<div className="description">
				{messages.sharing.title}
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
}
export default withIntl(IndexPage)
