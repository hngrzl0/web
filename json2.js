export class RecentMovieItem {
    constructor(movie) {
        this.id = movie.id;
        this.title = movie.title;
        this.thumb = movie.thumb;
        this.thumbAlt = movie.alt;
        this.publishedDate = movie.publishedDate;
        this.shareCount = movie.shareCount;
    }

    Render() {
        return `<article class="recentMovie" id="recentMovie_${this.id}">
                    <img src="${this.thumb}" class="recentNews-thumb"/>
                    <div class="recentMovie-text">
                        <h1 class="recentMovie-header" contenteditable="true" id="recentMovie_title_${this.id}">${this.title}</h1>
                        <div class="recentMovie-stat">
                            <div class="recentMovie-pubdate">${this.publishedDate}</div>
                            <div class="recentMovie-shareCount">${this.shareCount}</div>
                            <a href="#">More...</a>
                        </div>
                    </div>
                </article>`;
    }

    Bind(eventType, element, property) {
        gebi(`${element}_${this.id}`).addEventListener(eventType, (event) => {
            this[property] = event.target.innerHTML;
            recentMovie._hasChanged = true;
            console.log(`event:${event} this=${JSON.stringify(recentMovie)}`);
        });
        return this;
    }
}

export class RecentMovie {
    constructor(recentMovieUrl, dateFilter) {
        this._recentMovieList = [];
        this._recentMovieUrl = recentMovieUrl;
        this._lastUpdated = Date.now();
        this._hasChanged = false;
        this.dateFilter = dateFilter;
    }

    Upload() {
        if (this._hasChanged) {
            fetch(this._recentMovieUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'versioning': false
                },
                body: JSON.stringify(this._recentMovieList)
            })
                .then(response => { console.log(response.status); })
                .catch(err => { console.log(err); });

            this._hasChanged = false;
        }
    }

    Download(targetElement) {
        fetch(`${this._recentMovieUrl}/latest`)
            .then(result => result.json())
            .then(jsob => {
                const filteredArray = jsob.record.filter(movieItem => Date.parse(movieItem.publishedDate) > this.dateFilter);

                if (filteredArray.length > 0) {
                    gebi(targetElement).insertAdjacentHTML("afterbegin",
                        filteredArray
                            .map(newMovie => {
                                const _newMovie = new RecentMovieItem(newMovie);
                                this._recentMovieList.push(_newMovie);
                                return _newMovie.Render();
                            })
                            .reduce((prevVal, curVal) => prevVal + curVal, "")
                    );

                    this._recentMovieList.forEach(movieItem => movieItem.Bind("input", "recentMovie_title", "title"));
                }
            })
            .catch(err => { console.log(err); });
    }
}

export const gebi = id => document.getElementById(id);

import { RecentMovie, gebi } from './movieModule';

const params = new URLSearchParams(document.location.search);
const dateFilter = params.get("date");

const recentMovie = new RecentMovie("https://api.jsonbin.io/v3/b/5faab1a348818715939ecd04", Date.parse(dateFilter));

recentMovie.Download("main");

setInterval(() => recentMovie.Download("main"), 60000);
setInterval(() => recentMovie.Upload(), 15000);
