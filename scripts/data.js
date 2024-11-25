const Audio=document.querySelector("#mainAudioEl");
let tempAudio=document.querySelector("#tempAudioEl");
const mainWindowSearchBar = document.getElementById("mainSearchBar");
const mainWindowSearchDefault = document.querySelector(".mainwindow-search-default");
const mainWindowSearchResult = document.querySelector(".mainwindow-search-results");
let mainSearchBarFocus=false;
let openedInMobile = false;
const widthForMobileCardsCluttering = 740;
let artistArray=[];
let userDevice;
const homeTabContainer=document.querySelector(".mainwindow-cont-wrapper-home");
const searchTabContainer=document.querySelector(".mainwindow-cont-wrapper-search");
const stylingForSearchTab=`
#homeicon-text{
    color:rgb(167, 166, 166);
}
#homeicon-svg{
    color:rgb(167, 166, 166);

      font-variation-settings:
      'FILL' 0,
      'wght' 400,   
      'GRAD' 0,
      'opsz' 24;
    
}
.mainSearchBarCont{
  display:flex;
}
#searchicons-svg{
  color:white;
}
#searchicon-text{
  color:white;
}
`
const stylingForHomeTab=`'
#homeicon-text{
    color:white;
}
#homeicon-svg{
    color:white;

      font-variation-settings:
      'FILL' 1,
      'wght' 400,   
      'GRAD' 0,
      'opsz' 24;
    }
    

.mainSearchBarCont{
  display:none;
}
#searchicons-svg{
  color:grey;
}
#searchicon-text{
  color:grey;
}
`


const playIcon_BarsHtml=`<span id="nowPlayingPlayIcon"class="material-symbols-outlined">
play_arrow
</span>
<div class="bars" style="position:relative;z-index:2;">
  <div class="bars__item"></div>
  <div class="bars__item"></div>
  <div class="bars__item"></div>
  <div class="bars__item"></div>
</div>`;


const sideBarCollapsedStyling = `
.playlist-thumb{
 height:45px;
}
.textforplaylist{
  display: none;
}
.textforartist{
  display: none;
}
#recenticon{
  display:none;
}

.tagcontainer2 {
  display: flex;
  align-items: center;
  margin-left: 4vmin;
  gap: 1vmin;
}

.tagcontainer {
  display:none;
 
}
.icontext{
  display:none;
}
#leftarrowiconsvg{
  display:none;
}
#plusiconsvg{
  display:none;
}
.defaultlistings{
  height:72vh;
}
#homeicon-svg,#libraryicon-svg,#searchicons-svg{
  font-size:30px;
}
#searchicons-svg{
  font-size:24px;
}

.sidebar{
  width:4.5vw;
}


.playlistsideblock1{
  margin:0;
  gap:0;
padding-left:15%;
}
.artistsideblock1{
  margin:0; margin:0;
  padding-left:15%;
}
.artistsideblock1 img{
  height:50px;
  width:50px;
}


.defaultlistings::-webkit-scrollbar{
  display: none;
}
.defaultlistings:hover::-webkit-scrollbar{
  display:initial;
}

.playlistsideblock1,.artistsideblock1{
  padding-left: 12%;
}
.playlistsideblock1{
  padding-left: 15%;
}
.defaultlistings:hover .playlistsideblock1{
  padding-left: 17%;
}
.defaultlistings:hover .artistsideblock1{
  padding-left: 14%;
}

#libraryicon,#homeicon{
  padding-left:29%;
}
#searchicon{
  padding-left:33%;
  padding-bottom:5%;
}
.mainwindow{
  width:95vw;
}
#libraryicon::before{
  content:"Expand your library";
 } 
 .songDescription {
  margin-top: 1vh;
  font-size: 0.8vw;
  width: 9vw;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.582);
}
  .cardImage {
    height: 9vw;
    width: 9vw;
    border-radius: 0.6vw;
  }
  #collapsedSong{
    display:initial;
  }
  .logo{
padding-left:29%;
  }
  .mainNav{
    width:95.4vw;
  }
  nav{
    padding-left:1.5%;
  }
 `;

const musicPlayerOpenedStyling = `.fullScreenPlayer{
  height:100vh;
  width:100vw;
  position: absolute;
  z-index:5;
  transition:all ease 0.2s;
 
  
}

.wrapperForMusicBar{
  height:100vh;
  width:100vw;
  bottom:0;
  align-items:flex-end;
}
.musicBar{
  margin-bottom:4vw;
}
.fullScreenPlayer .currentSong{
  flex-direction:column;
}
.fullScreenPlayer #likeicon{
  margin-left:0;
}
.likeAndCrrSongContainer{
  display:flex;
  align-items: center;
  
}

.fullScreenPlayer .currentMusic-Player div{
  width:78vw;
  overflow: hidden;
}
.fullScreenPlayer .currentMusic-Player div::before{
  display: none;
 }

.fullScreenPlayer .currentMusic-Player #cover::before{
  background-image:  linear-gradient(to left,var(--colorForBeforePLayer) 10%,transparent);
  width:15%;
  display:initial;
  right:-1%;
}


.fullScreenPlayer .currentSong{
  padding-left:0;
}
.fullScreenPlayer .currentSong img{
   
    height:85vw;
    width:85vw;
    border-radius: 3vw;
    box-shadow: 5px 15px 100px -5px rgb(0 0 0 / 57%);
    
}
.fullScreenPlayer .currentMusic-Player p{
  font-size:4vw;
}
.fullScreenPlayer #crrSongNameInPTag{
  font-size:6vw;
}
.fullScreenPlayer .likeAndCrrSongContainer{
  width:100vw;
  gap:5vw;
  justify-content: center;
  align-items: center;
    margin-top:5vw;
}
.fullScreenPlayer .headerForPlayer{
    margin-top:20vw;
    font-size:4vw;
    font-weight:600;
}
.fullScreenPlayer .centerControls{
   flex-direction:column;
}
.fullScreenPlayer .timingsContainer{
  width:100%;
    display:flex;
    font-size:4vw;
    font-weight:300;
    justify-content: space-between;
}
.fullScreenPlayer .progressBar{
  background-color: #ffffff44;
  width:100%;
  margin-top:4vw;
}
.fullScreenPlayer .controls{
  width:100%;
  align-items: center;
}
.fullScreenPlayer .centerControls{
  width:90%;
}
.fullScreenPlayer .mainControls{
  display: flex;
  margin-top:5vw;
  gap:5vw;
}


#controlicon-play{
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
}

.fullScreenPlayer #controlicon-shuffle{
  font-size: 9vw;
  color: rgb(21, 255, 91);
  font-variation-settings: "FILL" 1, "wght" 200, "GRAD" 0, "opsz" 24;
}
.fullScreenPlayer #controlicon-loop{
  font-size: 9vw;
  font-variation-settings: "FILL" 1, "wght" 200, "GRAD" 0, "opsz" 24;
}
.fullScreenPlayer #controlicon-play{
  font-size: 18vw;
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
}
.fullScreenPlayer #controlicon-next{
    color: rgb(250, 250, 250);
  font-size: 13vw;
  font-variation-settings: "FILL" 1, "wght" 200, "GRAD" 0, "opsz" 24;
}
.fullScreenPlayer #controlicon-prev{
  color: rgb(255, 255, 255);
  font-size: 13vw;
  font-variation-settings: "FILL" 1, "wght" 200, "GRAD" 0, "opsz" 24;
}
.fullScreenPlayer .centerControls:hover .progressBarFill {
  background-color: #ffffff;
}
.fullScreenPlayer #progressbarBullet{
  opacity: 1;
  height:4vw;
  width:4vw;
  position: relative;
  z-index:1;
  box-shadow: -3px 0px 10px -3px black;
}

  `;

const mainWindowBg = [
  "linear-gradient(to top, rgba(18,18,18,1) 40%, rgb(13, 54, 22))",
  "linear-gradient(to top, rgba(18,18,18,1) 40%, rgb(28, 29, 85))",
  "linear-gradient(to top, rgba(18,18,18,1) 40%, rgb(85, 28, 28))",
  "linear-gradient(to top, rgba(18,18,18,1) 40%, rgb(84, 85, 28))",
  "linear-gradient(to top, rgba(18,18,18,1) 40%, rgb(28, 78, 85))",
  "linear-gradient(to top, rgba(18,18,18,1) 40%, rgb(32, 32, 32))",
];

const playlist = [
  "tracks/sweaterweather.mp3",
  "tracks/reflections.mp3",
  "tracks/505.mp3",
  "tracks/Apocalypse.mp3",
  "tracks/Shut up My Moms Calling (Sped up).mp3",
  "tracks/stay.mp3",
  "tracks/idontwannabeyouanymore.mp3",
  "tracks/Cults - Always Forever.mp3",
  "tracks/Water Fountain.mp3",
  "tracks/Romantic Homicide.mp3",
  "tracks/Call Out My Name.mp3",
  "tracks/First Person Shooter.mp3",
];

let songDetails =[
  {
    album: "Sweater Weather",
    description: "The Neighbourhood",
    duration: "04:00",
    fullName: "Sweater Weather",
    name: "Sweater Weather",
    src: "https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921"
  },
  {
    album: "Reflections",
    description: "The Neighbourhood",
    duration: "04:05",
    fullName: "Reflections",
    name: "Reflections",
    src: "https://i.scdn.co/image/ab67616d00001e029b6ac98a52f62d5cb473da40"
  },

  {
    album: "Arctic Monkeys",
    description: "Arctic Monkeys",
    duration: "03:16",
    fullName: "505",
    name: "505",
    src: "https://i.scdn.co/image/ab67616d00001e02b1f8da74f225fa1225cdface"
  },

  {
    album: "Apocalypse",
    description: "Cigarettes After Sex",
    duration: "04:13",
    fullName: "Apocalypse",
    name: "Apocalypse",
    src: "https://i.scdn.co/image/ab67616d00001e02765c3f0a6ce3d22bc5485010"
  },

  
  {
    album: "Shut up My Moms Calling (Sped up)",
    description: "Hotel Ugly",
    duration: "02:15",
    fullName: "Shut up My Moms Calling (Sped up)",
    name: "Shut up My Moms Calling",
    src: "https://i.scdn.co/image/ab67616d0000b2737437083c2521a8c077b9cfd7"
  },

  {
    album: "STAY",
    description: "Justin Bieber",
    duration: "02:21",
    fullName: "STAY",
    name: "STAY",
    src: "https://i.scdn.co/image/ab67616d0000b27341e31d6ea1d493dd77933ee5"
  },
  {
    album: "idontwannabeyouanymore",
    description: "Billie Eilish",
    duration: "03:24",
    fullName: "idontwannabeyouanymore",
    name: "idontwannabeyouanymore",
    src: "https://i.scdn.co/image/ab67616d00001e02a9f6c04ba168640b48aa5795"
  },
  
  {
    album: "Always Forever",
    description: "Cults",
    duration: "03:45",
    fullName: "Always Forever",
    name: "Always Forever",
    src: "https://i.scdn.co/image/ab67616d00001e02bb2c501e91fd02780cd332c6"
  },


  {
    album: "Water Fountain",
    description: "Alec Benjamin",
    duration: "03:21",
    fullName: "Water Fountain",
    name: "Water Fountain",
    src: "https://i.scdn.co/image/ab67616d00001e02459d675aa0b6f3b211357370"
  },
  {
    album: "Romantic Homicide",
    description: "d4vd",
    duration: "02:21",
    fullName: "Romantic Homicide",
    name: "Romantic Homicide",
    src: "https://i.scdn.co/image/ab67616d00001e02bd1a52b3d5903ee01c216da0"
  },

  {
    album: "Call Out My Name",
    description: "The Weeknd",
    duration: "03:48",
    fullName: "Call Out My Name",
    name: "Call Out My Name",
    src: "https://i.scdn.co/image/ab67616d00001e021f6a2a40bb692936879db730"
  },

  {
    album: "First Person Shooter",
    description: "Drake",
    duration: "04:07",
    fullName: "First Person Shooter",
    name: "First Person Shooter",
    src: "https://i.scdn.co/image/ab67616d00001e027d384516b23347e92a587ed1"
  },

];

let profilePictureUrls = [
 
  "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c11902554864ceae72b07d08",//thenbhd
  "https://i.scdn.co/image/ab67616d00001e02b1f8da74f225fa1225cdface",//am
  "https://i.scdn.co/image/ab67616d00001e02765c3f0a6ce3d22bc5485010",//cas
  "https://i.scdn.co/image/ab6761610000f178939033cc36c08ab68b33f760",// hotelugly
  "https://i.scdn.co/image/ab6761610000f1788ae7f2aaa9817a704a87ea36",// justin
  "https://i.scdn.co/image/ab67616d00001e02a9f6c04ba168640b48aa5795",// billie
  "https://i.scdn.co/image/ab6761610000f17892ec52fb43fbd4d2511a9d1d",// cults
  "https://i.scdn.co/image/ab6761610000f17810164a7f6d166aabbb00c4dd",// benjamin
  "https://i.scdn.co/image/ab6761610000f178ad447187a35f422307e88ad3",// d4vd
  "https://i.scdn.co/image/ab6761610000f1789e528993a2820267b97f6aae",// weeknd
  "https://i.scdn.co/image/ab6761610000f1784293385d324db8558179afd9", //drake

];


const songCardInnerHtml=`
<div class="songCard">
          <span id="cardplayicon" class="material-symbols-outlined">
            play_arrow </span>
            <img src=""
            class="cardImage" />
          <p class="songName"></p>
          <div style="margin: 0;overflow: hidden;width:40vw;height:6vw;background-color:transparent;">
          <p class="songDescription">
           
          </p>
        </div>
        </div>`;
//------------------

const artistCardhtml=`
<img src="" class="playlist-thumb" />
<div class="textforartist">
  <p class="artistname"></p>
  <p class="thumbnaillabel">Artist</p>
</div>
`


let currentWidth = window.innerWidth;

  if (currentWidth <= widthForMobileCardsCluttering) {
    openedInMobile=true;
  }

  if(localStorage.getItem("device")){
    userDevice=localStorage.getItem("device");
  }
  else {
    if(window.innerWidth>widthForMobileCardsCluttering){
      localStorage.setItem("device","pc");
      userDevice=localStorage.getItem("device");

    }
    else if(window.innerWidth<=widthForMobileCardsCluttering){
      localStorage.setItem("device","mob");
      userDevice=localStorage.getItem("device");

    }
  }
