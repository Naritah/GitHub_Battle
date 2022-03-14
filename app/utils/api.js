const id = '6a40efb9d80b72d011fa'
const sec = '2d320bd27b962f9a65ec7f0b7aba3df31f24591d'
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username){
    if(message === 'Not Found') {
        return `${username} doesn't exist.`
    }

    return message
}

function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos${params}$per_page=100`)
        .then((res) => res.json())
        .then((repos)=>{
            if (repos.message){
                throw new Error(getErrorMsg(repos.message, username))
            }

            return repos
        })

}

function getProfile (username) { 
    return fetch(`https://api.github.com/users/${username}${params}`)
        .then((res) =>res.json())
        .then((profile) =>{
            if (profile.message){
                throw new Error(getErrorMsg(profile.message, username))
            }

            return profile
        })
}

function getStarCount(repos){
    return repos.reduce((count, {stargazers_count}) =>count + stargazers_count, 0)
}

function calculateScore (followers, repos) {
  return (followers * 3) + getStarCount(repos)
}

function getUserData(player){
    return Promise.all([
        getProfile(player),
        getRepos(player),
    ]).then(([profile, repos])=>({
        profile, 
        score : calculateScore(profile.followers, repos)
    }))
}

function sortPlayers (players){
    return players.sort((a,b)=> b.score - a.score)
}

export function battle (players) {
    return Promise.all([
      getUserData(players[0]),
      getUserData(players[1])
    ]).then((results) => sortPlayers(results))
  }

export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) =>{
            if(!data.items){ //If data.items doesn't exist
                throw new Error(data.message)
            }

            return data.items
        })
}