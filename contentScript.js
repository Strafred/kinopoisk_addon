(() => {
    console.log("content script loaded");
    chrome.runtime.onMessage.addListener((obj) => {
        const {type} = obj;

        const movieLines = document.getElementsByClassName("ListItem_wrapper__vOmuh");
        const movieLineInitialSize = movieLines[0].childNodes.length;
        console.log(movieLineInitialSize);

        if (type === "kinopoisk_page_loaded") {
            const movieCards = document.getElementsByClassName("ListItem_selection-card__MeC9v");

            for (let i = 0; i < movieCards.length; i++) {
                console.log(i);
                console.log(movieCards.length);
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

            console.log(movieLines.length);

            const movieCardsUpdated = Array.from(movieCards);
            for (let i = 0; i < movieLines.length; i++) {
                movieLines[i].childNodes.forEach((node) => {
                    console.log(node);
                    node.remove();
                });

                for (let j = 0; j < movieLineInitialSize; j++) {
                    if (movieCardsUpdated.length > 0) {
                        movieLines[i].appendChild(movieCardsUpdated[0]);
                        movieCardsUpdated.shift();
                    }
                }
            }
        }
    });
})();
