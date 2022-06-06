import axios from "axios"
   export const state=()=>({
        isPlaying:true,
        currentTrackID:0,
        trackProgress:0,
        trackLength:0,
        activePageID:1,
        activeMainPageTabID:1,
        MainTabs: [{ id: 1, text: "Всё",component:'AllMainPage' }, { id: 2, text: "Новые релизы",component:'AgendaMainPage' }, { id: 3, text: "Чарты",component:'ChartsMainPage' }, { id: 4, text: "Настроения и жанры",component:'MoodsMainPage' },],
        pages:[{id:1,text: "Главная",component:'MainPage'},{id:2, text: "Альбомы", text: "Альбомы и треки" ,component:'AlbumPage'},{id:3, text: "Загрузить трек" ,component:'TrackPage'},{id:4, text: "Профиль",component:'ProfilePage'},{id:5,text: `<i class="gg-search"></i>`,component:'SearchPage'}],
        currentTrack:'' ,
        tracks:[] ,
        user: { login:'', password:''},
    })

    export const getters={
        // currentTrack(state,getters){
        //    return 'http://localhost:5000/audio/4b831ce5-d3c8-4f39-b970-fb76f9d75cad.mp3'
        // }
    }
    export const mutations={
        checkLocalStorageUser(state){
            if(localStorage.getItem('user')){
                state.user=JSON.parse(localStorage.getItem('user'))
                state.user.picture = `http://localhost:5000/${state.user.picture}`
                // console.log(state.user)
            }
        },
        checkUserLogged(state){
            if (localStorage.user){
                state.user = JSON.parse(localStorage.user)
            }
        },
        playPause(state){
            if(!state.isPlaying){
               document.getElementById('player').pause();
                state.isPlaying = true;
            }else{
                document.getElementById('player').play();
                state.isPlaying = false;
            }
        },
        //logout
        logout(state){
            state.user={}

            localStorage.removeItem('user');
        },
        goToNextTrack(state){
            if( state.currentTrackID!= state.tracks.length-1){
            state.currentTrackID +=1
            // state.currentTrack = state.tracks[state.currentTrackID]
            console.log(`going to next track ${state.currentTrackID}`)
        }
        },
        goToPreviousTrack(state){
            if(state.currentTrackID!=0){
            state.currentTrackID -=1
            // state.currentTrack = state.tracks[state.currentTrackID]
            console.log(`going to previous track ${state.currentTrackID}`)
        }},
        authorization(state,user){
            state.user = user
            localStorage.user = JSON.stringify(user)
            localStorage.setItem('user',JSON.stringify(user))
            state.user.isLogged = true
            if(state.user.picture)
            state.user.picture = `http://localhost:5000/${user.picture}`
        },
        registration(state,user){
            state.user = user
            localStorage.user = JSON.stringify(user)
        },
        goTotrack(state,track){
            state.isPlaying = false;
            let audio =  document.getElementById('player')
            state.currentTrack = track;
            // state.currentTrack.picture =`http://localhost:5000/${track.picture}`
            audio.src = `http://localhost:5000/${track.audio}`
            audio.currentTime = 0;
            audio.play();
            // state.activePageID=5;
        },
        changeTrackLength(state,val){
            state.trackLength = val;
        },
        likeTrack(state){
            console.log(`Liked ${state.currentTrackID}`)
        },
        changeTrackProgress(state,value){
            state.trackProgress=value
            document.getElementById('player').currentTime = value
        },
        watchTrackProgress(state,value){
            state.trackProgress=Math.floor(value);
            
        },
        changeActivePage(state,id){
            state.activePageID = id;
            
        },
        changeActiveMainPageTab(state,id){
            state.activeMainPageTabID = id;
        },
        getTracks(state,resp){
            state.tracks = resp.data
            // state.currentTrack = `http://localhost:5000/${state.tracks[state.currentTrackID].audio}`
        },
        searchTracks(state,tracks){
            state.tracks=tracks
        },
    }
    export const actions={
        authorization({commit},user){
           let  reqBody = {
                email:user.login,
                password:user.password
            }
            axios.post('http://localhost:5000/users/authorization',reqBody)
            .then(resp=>{
                commit('authorization',resp.data)
            })
        },
        registration({commit},user){
           let  reqBody = new FormData()
           reqBody.append('email',user.login)
              reqBody.append('password',user.password)
            axios.post('http://localhost:5000/users',reqBody)
            .then(resp=>{
                commit('registration',resp.data)
              commit('authorization',resp.data)
            })
          
        },
        playPause({commit}){
            commit('playPause')
            let audio =  document.getElementById('player')
            setInterval(function(){
            commit('watchTrackProgress',audio.currentTime)
            },1)
        },
        
        goToNextTrack({commit}){
            // commit('goToNextTrack')
            // console.log(state.tracks[state.currentTrackID])
        //    commit('goTotrack',state.tracks[state.currentTrackID])
        },
        goToPreviousTrack({commit}){
            // commit('goToPreviousTrack')
            // console.log(state.tracks[state.currentTrackID])
            // commit('goTotrack',state.tracks[state.currentTrackID])
        },
        likeTrack({commit}){
            commit('likeTrack')
        },
        changeTrackProgress({commit},value){
            commit('changeTrackProgress',value)
        },
        watchTrackProgress({commit},value){
            commit('watchTrackProgress',value)
        },
        changeActivePage({commit},id){
            commit('changeActivePage',id)
        },
        changeActiveMainPageTab({commit},id){
            commit('changeActiveMainPageTab',id)
        },
        async getTracks({commit}){
            let resp = await axios.get('http://localhost:5000/tracks')
              await commit('getTracks',resp)
             
         },
         async searchTracks({commit},query){
            try{
                let resp =await axios.get('http://localhost:5000/tracks/search?query=' +query)
                commit('searchTracks',resp.data)
           }
           catch(e){
              console.log(e)
           }
            
         },
        //  playTrack({commit},id){
        //    commit('playTrack',id)
        // },
        goTotrack({commit},track){
            commit('playPause')
            commit('goTotrack',track)
            let audio =  document.getElementById('player')
            audio.onloadedmetadata=function(){
            commit('changeTrackLength',(Math.floor(audio.duration)))
            }
            setInterval(function(){
            commit('watchTrackProgress',audio.currentTime)
            },1)
            axios.post('http://localhost:5000/tracks/listen/'+track._id)
        },
        logout({commit}){
            commit('logout')
        },
        checkLocalStorageUser({commit}){
            commit('checkLocalStorageUser')
        }

    }