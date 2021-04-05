//filter js


//get Data from form

const form = document.querySelector('.form_js');
const reset = document.querySelector('.reset_js');
const result = document.querySelector('.result_js');
const paginationLink = document.querySelector('.number_js');
const formSubmit = document.querySelector('.formSubmit_js');
const buttonNext = document.querySelector('.buttonNext_js');
const buttonPrev = document.querySelector('.buttonPrev_js');
let links = [];



getTags();

let fullData = getParamsFromURL();
fullData.page = 0;
setValueToForm(form, fullData);
window.onload = function () {
    formSubmit.click();
}
form.addEventListener('submit', function submit(event) {
    event.preventDefault();
    let page = fullData.page;
    let limits = fullData.limit;
    fullData = getFormData(form);
    fullData.page = page;
    if (fullData.limit != limits) {
        fullData.page = 0;
    }
    setParamsToURL(fullData);

    result.innerHTML = preloaderCreaterblog();
    getPost(fullData, function callback(xhr) {
        const response = JSON.parse(xhr.response);
        if (response.success) {
            result.innerHTML = ``;

            for (let post of response.data) {
                result.innerHTML += postCreater(post);
            }
            paginationCreate(response, paginationLink, fullData);
            links = paginationLink.querySelectorAll('.link_js');
            for (let i = 0; i < links.length; i++) {
                link = links[i];
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    fullData.page = i;
                    setParamsToURL(fullData);
                    submit(event);

                });
            }
        } else {
            console.error('Server error');
        }
    });


});


//Button Reset parametrs
reset.addEventListener('click', function () {
    form.reset();
    params = {};
    setParamsToURL(params);
})

buttonPrev.addEventListener('click', function () {
    if (fullData.page <= 0) {
        buttonPrev.classList.add('pagination__button_disabled');
        return
    } else {
        console.log(fullData.page);
        fullData.page -= 1;
        formSubmit.click();
        buttonPrev.classList.remove('pagination__button_disabled');
    }
})
buttonNext.addEventListener('click', function () {
    if (fullData.page >= links.length - 1) {
        buttonNext.classList.add('pagination__button_disabled');
        return

    }
    fullData.page += 1;
    formSubmit.click();
})


function setActiveSlide() {
    if (fullData.page <= 0) {
        return;
    }

    setButtonState(buttonNext, true);
    setButtonState(buttonPrev, true);
    FullData.page === 0 && setButtonState(buttonPrev);
    FullData.page === 0 && setButtonState(buttonNext);

}


function setParamsToURL(params) {

    let url = new URL('http://asd.asd');
    const keysArray = Object.keys(params);
    for (let key of keysArray) {
        if (typeof params[key] === 'object') {
            const arr = params[key];
            for (let i of arr) {
                url.searchParams.append(key, i);
            }
        } else {
            url.searchParams.append(key, params[key]);
        }
        history.replaceState({}, document.title, url.search);
    }
}

function getParamsFromURL() {
    const searchParams = new URL(window.location).searchParams;
    let params = {};
    if (searchParams.has('tags')) {
        params.tags = searchParams.getAll('tags');
    }
    if (searchParams.has('views')) {
        params.views = searchParams.get('views');
    }
    if (searchParams.has('commentsCount')) {
        params.commentsCount = searchParams.getAll('commentsCount');
    }
    if (searchParams.has('limit')) {
        params.limit = searchParams.get('limit');
    }
    if (searchParams.has('sorted')) {
        params.sorted = searchParams.get('sorted');
    }
    if (searchParams.has('title')) {
        params.title = searchParams.get('title');
    }
    if (searchParams.has('page')) {
        params.page = searchParams.get('page');
    }
    return params;
}

function getTags() {
    let xhr = new XMLHttpRequest();
    const box = document.querySelector('.tagBox_js');

    xhr.open('GET', `${SERVER_URL}/api/tags`);
    box.innerHTML = preloaderCreaterblog();
    xhr.send();

    xhr.onload = function () {
        const response = JSON.parse(xhr.response);

        if (response.success) {
            box.innerHTML = '';
            for (let tag of response.data) {
                box.innerHTML += tagsCreater(tag);
            }
        } else {
            console.error(response._message);
        }
    };
    xhr.onerror = function () {
        console.error('Error. Try again.');
    };
};

//color checkbox 


function tagsCreater(tag) {
    return `
    <label class="tags-box">
        <input class="tags-box__tag hidden hidden_focus" type="checkbox" checked="checked" name="tags" value="${tag.id}">
        <span class="tags-box__checkbox" style = "border-color: ${tag.color}">
        <svg class="tags-box__svg" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6.75L5.91301 12.77C6.20128 13.2135 6.85836 13.1893 7.11327 12.7259L13.425 1.25" stroke="${tag.color}" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        </span>
    </label>`
};


//Get posts


function getPost(params, onload) {
    let url = new URL('http://asd.asd');
    if (params.tags) {
        url.searchParams.set('tags', JSON.stringify(params.tags));
    }
    url.searchParams.set('v', VERSION_API);

    let filter = {};

    if (params.title) {
        filter.title = params.title;
    }
    if (params.views) {
        filter.views = viewsBetweens(params.views);
    }
    if (params.commentsCount.length != 0) {
        filter.commentsCount = commentsBetweens(params.commentsCount);
    }
    if (params.sorted) {
        url.searchParams.set('sort', JSON.stringify([params.sorted, 'DESC']));
    }
    if (params.limit) {
        url.searchParams.set('limit', +params.limit);
    }
    if (params.page) {
        url.searchParams.set('offset', +params.page * (+params.limit));
    }

    url.searchParams.set('filter', JSON.stringify(filter));

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${SERVER_URL}/api/posts?${url.searchParams}`);
    xhr.send();
    xhr.onload = function () {
        onload(xhr);
    }; onerror = function () {
        console.error(response._message);
    }
}


function skipPost(page, limits) {
    return page * limits

}


function postCreater(post) {
    return `<div class="card__box">
    <div class="card__inner-img">
<picture class="card__img">
<source srcset="${SERVER_URL}${post.photo.mobilePhotoUrl}, ${SERVER_URL}${post.photo.mobile2xPhotoUrl} 2x" media="(max-width: 640px)">
<source srcset="${SERVER_URL}${post.photo.tabletPhotoUrl}, ${SERVER_URL}${post.photo.tablet2xPhotoUrl} 2x" media="(max-width: 1023px)">
<source srcset="${SERVER_URL}${post.photo.desktopPhotoUrl}, ${SERVER_URL}${post.photo.desktop2xPhotoUrl} 2x">
<img src="${SERVER_URL}${post.photo.desktopPhotoUrl}" width="320" height="236" alt="${post.title}"/>
</picture>
</div>
    <div class="card__inner-box">
        <ul class="card__taglist Tag_js">
            ${makeTagsPost(post)}
        </ul>
        <ul class="card__inner-info">
            <li class="card__infoitem">
                <span class="card__infoText">${getDate(post.date)}</span>
            </li>
            <li class="card__infoitem">
                <span class="card__infoText">${post.views} views</span>
            </li>
            <li class="card__infoitem">
                <span class="card__infoText">${post.commentsCount} comments</span>
            </li>
        </ul>
        <h3 class="card__title">${post.title}</h3>
        <p class="card__text">${post.text}</p>
        <a class="card__link" href="#">Go to this post</a>
    </div>
</div>`;
}
// Create date for post
function getDate(date) {
    const time = new Date(date);
    const day = getFullDay(time.getDate());
    const month = getFullMonth(time.getMonth());
    const year = time.getFullYear();
    return `${day}.${month}.${year}`
}

function getFullMonth(dateMonth) {
    dateMonth += 1;
    if (dateMonth > 9) {
        return dateMonth
    } else {
        return "0" + dateMonth
    }
}
function getFullDay(dateDay) {
    if (dateDay > 9) {
        return dateDay
    } else {
        return "0" + dateDay
    }
}



//Create tags for post

function makeTagsPost(post) {
    const tags = post.tags;
    let countTags = "";
    for (let tag of tags) {

        countTags += postTagCreater(tag);
    }
    return countTags
}

function postTagCreater(tag) {
    return `
    <li class="card__tags">
        <span class="card__tag" style="background-color: ${tag.color};" title="${tag.name}"></span>
    </li>`
};


function paginationCreate(response, paginationLink, data) {
    let quantity = Math.ceil(+(response.count) / data.limit);
    paginationLink.innerHTML = '';
    for (let i = 0; i < quantity; i++) {
        if (data.page === i) {
            paginationLink.innerHTML += `<a href="?page=${i}" class="pagination__num pagination__num_active link_js">${i + 1}</a>`
            buttonPrev.classList.remove('pagination__button_disabled');
            buttonNext.classList.remove('pagination__button_disabled');
        } else {
            paginationLink.innerHTML += `<a href="?page=${i}" class="pagination__num link_js">${i + 1}</a>`
            buttonPrev.classList.remove('pagination__button_disabled');
            buttonNext.classList.remove('pagination__button_disabled');
        }


    }
}

function viewsBetweens(views) {
    let viewsInterval = views.split('-');
    return { $between: [+viewsInterval[0], +viewsInterval[1]] }
}

function commentsBetweens(comments) {

    let firstArr = comments[0].split('-');
    let lastArr = comments[comments.length - 1].split('-');

    let firstNum = +firstArr[0];
    let lastNum = +lastArr[lastArr.length - 1];

    return { $between: [firstNum, lastNum] }

}

