import { ArticlesNoteProps } from "../../data/ArticleNote";
import './ArticleNote.css'
import { openInNewTab } from "../../utils/NewTab";

const ArticleNote: React.FC<{ items: ArticlesNoteProps[], isArticle: Boolean }> = ({ items, isArticle }) => {
    return (
        <div className="title-root">
            <h3 className="title">{isArticle ? "ARTICLES" : "NOTES"}</h3>
            {
                items.map(item =>
                    <div className="item-indiv"
                        onClick={() => {
                            if (isArticle) {
                                openInNewTab(item.url)
                            }
                        }}>
                        <h4>{item.title}</h4>
                        <h4>{item.date}</h4>
                    </div>
                )
            }
            <div className="line"></div>
        </div>
    )
}

export default ArticleNote;