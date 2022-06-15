import axios from "axios"
   export const state=()=>({
        isPlaying:true,
        currentTrackID:0,
        trackProgress:0,
        trackLength:0,
        activePageID:1,
        activeMainPageTabID:1,
        MainTabs: [{ id: 1, text: "Всё",component:'AllMainPage' },
         { id: 2, text: "Новые релизы",component:'AgendaMainPage' },
          { id: 3, text: "Чарты",component:'ChartsMainPage' },
           { id: 4, text: "Настроения и жанры",component:'MoodsMainPage' },],
        
        pages:[
            {id:1,text: "Главная",component:'MainPage'},
            // {id:2, text: "Альбомы", text: "Альбомы" ,component:'AlbumPage'},
            {id:3, text: "Загрузить трек" ,component:'TrackPage'},
            {id:4, text: "Профиль",component:'ProfilePage'},
            {id:5,text: `<i class="gg-search"></i>`,component:'SearchPage'}
        ],
        currentTrack:'' ,
        tracks:[] ,
        albums:[],
        album:[],
        user: { login:'', password:''},
    })

    export const getters={
        // currentTrack(state,getters){
        //    return 'http://localhost:5000/audio/4b831ce5-d3c8-4f39-b970-fb76f9d75cad.mp3'
        // }
    }
    export const mutations={
        getAlbum(state,album){
            // console.log(album)
            state.album=album
            state.tracks = album.tracks
        },
        checkLocalStorageUser(state){
            if(localStorage.getItem('user')){
                state.user=JSON.parse(localStorage.getItem('user'))
                // state.user.picture = `http://localhost:5000/${state.user.picture}`
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
        logout(state){
            state.user={}

            localStorage.removeItem('user');
        },
        goToNextTrack(state){
            if(state.currentTrackID < state.tracks.length-1){
                state.currentTrackID++
            }else{
                state.currentTrackID = 0
            }
        },
        goToPreviousTrack(state){
            //find current track in album
            let currentTrackIndex = state.album.findIndex(track => track.id === state.currentTrack._id)
            // console.log(currentTrackIndex)
            // if(state.currentTrackID > 0){
            //     state.currentTrackID--
            // }else{
            //     state.currentTrackID = state.tracks.length-1
            // }
        },
       async authorization(state,user){
            state.user = user
            if(state.user.picture)
            state.user.picture = `http://localhost:5000/${user.picture}`
            localStorage.user = JSON.stringify(user)
            localStorage.setItem('user',JSON.stringify(user))
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
            // console.log(`Liked ${state.currentTrackID}`)
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
        //add track to album
        addTrackToAlbum(state,obj){
            // console.log('adding')
            let {track,album}=obj
            // console.log(track)
            // console.log(album)
            // console.log(`track ${track._id} added to album ${album._id}`)
            let reqBody={
                trackId:track._id,
                albumId:album._id
            }
            // if(state.album.tracks.filter(el=>el==track._id).length==0){
                axios.post('http://localhost:5000/album/track',reqBody)
               
            // }
            // state.album.tracks.push(track)
            //add track to albums
            // state.albums.forEach(el=>{
            //     if(el._id==album._id){
            //         // console.log(el.tracks)
            //         el.tracks.push(track)
            //     }
            // }
            
            // )
            // // console.log(state.albums)
            
        },
        //addComment
        addComment(state,commentText){
            let comment = {
                text:commentText,
                username:state.user.email,
                trackId:state.currentTrack._id
            }
            // console.log(comment)
            state.currentTrack.comments.unshift(comment)
            axios.post('http://localhost:5000/tracks/comment',comment)
        },
        //addTag
        addTag(state,tagText){
            if(tagText.length>0){
            let tag = {
                text:tagText,
                username:state.user.email,
                trackId:state.currentTrack._id

            }
            // console.log(tag)
            state.currentTrack.tags.filter(el=>el.text==tagText).length==0?state.currentTrack.tags.push(tag):console.log('tag already exists')
            axios.post('http://localhost:5000/tracks/tag',tag)
        }
        },
        //get user albums
        getUserAlbums(state,albums){
            // console.log(albums)
            state.albums = albums
            // console.log(state.albums)
        },
        dislikeTrack(state,trackId){
                let reqBody={
                    albumId:state.albums[0]._id,
                    trackId:trackId
                }
             axios.post('http://localhost:5000/album/removetrack',reqBody)
        }

    }
    export const actions={
       async authorization({commit},user){
            let  reqBody = {
                email:user.email,
                password:user.password
            }
            let req = await  axios.post('http://localhost:5000/users/authorization',reqBody)
            .catch(e=>{
                console.log(e.response)
                alert("Неверный логин или пароль")
            })
            // console.log(req)
            if(req)
           commit('authorization',req.data)
           else
              commit('authorization',{})
        },
        registration({commit},user){
           let  reqBody = new FormData()
           reqBody.append('name',user.name)
           reqBody.append('email',user.email)
            reqBody.append('password',user.password)
            axios.post('http://localhost:5000/users',reqBody)
            .then(resp=>{
                if(resp){
                commit('registration',resp.data)
                // let authBody = new FormData()
                // authBody.append('email',user.email)
                // authBody.append('password',user.password)
                // commit('authorization',authBody)
                }else{
                    console.log('error')
                }
            }).catch(e=>{
                console.log("Ошибка регистрации")
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
        async changeActivePage({commit},id){
            commit('changeActivePage',id)
            if(id==5){
                let resp =await axios.get('http://localhost:5000/tracks/search?query=' +'')
                commit('searchTracks',resp.data)
            }
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
       async  goTotrack({commit},track){
            commit('playPause')
            let resp = await axios.get(`http://localhost:5000/tracks/`+track._id)
            // console.log(resp)
            commit('goTotrack',resp.data)
            let audio =  document.getElementById('player')
            audio.onloadedmetadata=function(){
            commit('changeTrackLength',(Math.floor(audio.duration)))
            }
            setInterval(function(){
            commit('watchTrackProgress',audio.currentTime)
            },1)
            axios.post('http://localhost:5000/tracks/listen/'+track._id)
        },
        addComment({commit},commentText){
            commit('addComment',commentText)
        },
        addTag({commit},tagText){
            // console.log(tagText.target.value)
           commit('addTag',tagText.target.value)
        },
        logout({commit}){
            commit('logout')
        },
        checkLocalStorageUser({commit}){
            commit('checkLocalStorageUser')
        },
        async getAlbum({commit},id){
            // console.log('http://localhost:5000/album/' + id)
            await axios.get('http://localhost:5000/album/'+ id)
            .then(res=>{
                // console.log(res.data)
                commit('getAlbum',res.data)
            })
         
            
        },
        async getUserAlbums({commit},id){
            // console.log('getting user`s albums')
            let reqBody={
                userId:id
            }
            await axios.post('http://localhost:5000/users/albums',reqBody)
            .then(res=>{
                // console.log(res.data)
                commit('getUserAlbums',res.data)
            })
        
        },
        async  addTrackToAlbum({commit,state,dispatch},obj){
            // console.log(obj)
            await commit('addTrackToAlbum',obj)
            await dispatch('getUserAlbums',state.user._id)
           if(state.album._id==state.albums[0]._id && state.activePageID===1){
            // console.log(state.activePageID!==5)
            await dispatch('getAlbum',state.albums[0]._id)
           }
            
        
        },
         async dislikeTrack({commit,state,dispatch},trackId){
             await commit('dislikeTrack',trackId)
             await dispatch('getUserAlbums',state.user._id)
           if(state.album._id==state.albums[0]._id && state.activePageID===1)
           await dispatch('getAlbum',state.albums[0]._id)
        },   
    }