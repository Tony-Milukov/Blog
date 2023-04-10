import {useEffect, useState} from "react";
import searchRequest from "./searchRequest";
import MatchedElement from "./matchedElement";
const SearchInput = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchMatches, setSearchMatches] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const matches = await searchRequest(searchValue);
            setSearchMatches(matches)
        }
        if (searchValue.length >= 1) {
            fetch()
        }
    }, [searchValue])

    const resetSearch = () => {
        setShowSearch(false)
        setSearchMatches([])
        setSearchValue("")
    }

    return <>
        <a onClick={() => setShowSearch(!showSearch)} className={`header__search-trigger `}></a>
        <div className={`header__search ${showSearch ? "search-is-visible" : ""}`}>

            <div role="search" method="get" className="header__search-form">
                <label>
                    <span className="hide-content">Search for:</span>
                    <input autoFocus onChange={(e) => setSearchValue(e.target.value)} type="search"
                           className="search-field"
                           placeholder="Type Keywords" value={searchValue} title="Search for:" autoComplete="off"/>
                </label>
                <div className="searchMatches">
                    {searchMatches.length >= 1 ?
                        searchMatches.map((i) => <MatchedElement
                                type={i.type}
                                title={i.title ?? null}
                                value={i.username ?? i.articleId}
                                handler={resetSearch}
                            />
                        )
                        : searchValue.length >= 1 ?
                            <span className={"nothingFoundSearch"}>nothing was found</span> : null}
                </div>
            </div>
            <a onClick={resetSearch} className="header__overlay-close">Close</a>
        </div>
    </>

}
export default SearchInput
