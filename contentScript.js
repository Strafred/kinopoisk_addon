(() => {
    console.log("content script loaded");
    chrome.runtime.onMessage.addListener((obj) => {
        const {type} = obj;

        if (type === "kinopoisk_page_loaded") {
            const movieCards = document.getElementsByClassName("ListItem_selection-card__MeC9v");
            const movieCardsInitialLength = movieCards.length.valueOf();

            for (let i = 0; i < movieCardsInitialLength; i++) {
                let movieContainer = movieCards[i].getElementsByClassName("SelectionCard_badges-container__zFU8Z")[0];
                let movieRatingParent = movieContainer.firstChild.firstChild;
                let movieRatingChild = movieContainer.firstChild.firstChild.firstChild;

                if (movieRatingChild) {
                    console.log(movieRatingChild.textContent);
                    if (parseFloat(movieRatingChild.textContent) < 7.0) {
                        movieCards[i].remove();
                        i--;
                    }
                }
            }
        }
    });
})();
