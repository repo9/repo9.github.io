function CModeMenu(){
    
    var _iModeSelected = MEDIUM_MODE;
    
    var _oTextHead;
    var _oDifficultyText;
    
    var _oButHuman;
    var _oButComputer;
    var _oButExit;
    var _oAudioToggle = null;
    var _oToggleEasy;
    var _oToggleMedium;
    var _oToggleHard;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    
    this._init = function(){

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_mod_menu'));
        s_oStage.addChild(oBg);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 20, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        var oExitX = CANVAS_WIDTH - (oSprite.width/2) - 125;
        _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){            
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this); 
        }    
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:_pStartPosExit.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        var iWidth = 600;
        var iHeight = 250;
        var iTextX = CANVAS_WIDTH/2;
        var iTextY = 350;
        _oTextHead = new CTLText(s_oStage, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    80, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_MODE,
                    true, true, true,
                    false );
        
        var oSprite = s_oSpriteLibrary.getSprite('but_vs_man');
        _oButHuman = new CGfxButton(CANVAS_WIDTH/2,700,oSprite,s_oStage);
        _oButHuman.addEventListener(ON_MOUSE_UP, this._onButHumanRelease, this);
        //_oButHelp.setVisible(false);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_vs_pc');
        _oButComputer = new CGfxButton(CANVAS_WIDTH/2,1200,oSprite,s_oStage);
        _oButComputer.addEventListener(ON_MOUSE_UP, this._onButComputerRelease, this);
      
        var oSprite = s_oSpriteLibrary.getSprite('difficulty_panel');
        var oDiffPanel = createBitmap(oSprite);
        oDiffPanel.regX = oSprite.width/2;
        oDiffPanel.regY = oSprite.height/2;
        oDiffPanel.x = CANVAS_WIDTH/2;
        oDiffPanel.y = 1510;
        s_oStage.addChild(oDiffPanel);
      
        var iWidth = 480;
        var iHeight = 50;
        var iTextX = CANVAS_WIDTH/2;
        var iTextY = 1440;
        _oDifficultyText = new CTLText(s_oStage, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    40, "center", "#fff", PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_DIFFICULTY,
                    true, true, true,
                    false );
      
        var oSprite = s_oSpriteLibrary.getSprite('toggle_easy');
        _oToggleEasy = new CToggle(CANVAS_WIDTH/2 - 170,1525,oSprite,false,s_oStage);
        _oToggleEasy.addEventListenerWithParams(ON_MOUSE_UP, this._onDifficultyToggle, this, EASY_MODE); 
      
        var oSprite = s_oSpriteLibrary.getSprite('toggle_medium');
        _oToggleMedium = new CToggle(CANVAS_WIDTH/2 -5,1525,oSprite,true,s_oStage);
        _oToggleMedium.addEventListenerWithParams(ON_MOUSE_UP, this._onDifficultyToggle, this, MEDIUM_MODE); 
        
        var oSprite = s_oSpriteLibrary.getSprite('toggle_hard');
        _oToggleHard = new CToggle(CANVAS_WIDTH/2 + 165,1525,oSprite,false,s_oStage);
        _oToggleHard.addEventListenerWithParams(ON_MOUSE_UP, this._onDifficultyToggle, this, HARD_MODE);
      
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };
    
    this.unload = function(){
        
        _oButHuman.unload();
        _oButComputer.unload();
        _oButExit.unload();
        _oToggleEasy.unload();
        _oToggleMedium.unload();
        _oToggleHard.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        s_oModeMenu = null;
        s_oStage.removeAllChildren();
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this._onDifficultyToggle = function(iMode){

        switch(iMode){
            
            case EASY_MODE: {
                    _oToggleEasy.setActive(true);
                    _oToggleMedium.setActive(false);
                    _oToggleHard.setActive(false);
                    _iModeSelected = EASY_MODE;
                    break;
            }
            case MEDIUM_MODE: {
                    _oToggleEasy.setActive(false);
                    _oToggleMedium.setActive(true);
                    _oToggleHard.setActive(false);
                    _iModeSelected = MEDIUM_MODE;
                    break;                    
            }
            case HARD_MODE: {
                    _oToggleEasy.setActive(false);
                    _oToggleMedium.setActive(false);
                    _oToggleHard.setActive(true);
                    _iModeSelected = HARD_MODE;
                    break;
            }            
        }
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
    };
    
    this._onButHumanRelease = function(){
        this.unload();
        s_oMain.gotoGame(MODE_HUMAN);
    };
    
    this._onButComputerRelease = function(){
        this.unload();
        s_oMain.gotoGame(MODE_COMPUTER, _iModeSelected);
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };

    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oModeMenu = this;
    this._init();
};

var s_oModeMenu = null;