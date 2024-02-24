function CCreditsPanel(){
    
    var _oBg;
    var _oButExit;
    
    var _oFade;
    var _oHitArea;
    var _oContainer;
    var _oListener;
    
    var _pStartPosExit;
    
    this._init = function(){
        
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oBgMenu = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(oBgMenu);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oFade);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSprite);
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = CANVAS_HEIGHT/2;
        _oBg.regX = oSprite.width/2;
        _oBg.regY = oSprite.height/2;
        _oContainer.addChild(_oBg);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this._onLogoButRelease);
        _oContainer.addChild(_oHitArea);
                
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH/2 +340, y: 650};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
        
        var iWidth = 600;
        var iHeight = 60;
        var iTextX = CANVAS_WIDTH/2;
        var iTextY = 860;
        var oTitle = new CTLText(_oContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    46, "center", "#fff", "Arial", 1,
                    2, 2,
                    TEXT_CREDITS_DEVELOPED,
                    true, true, true,
                    false );
	
       
        
        oSprite = s_oSpriteLibrary.getSprite('logo_credits');
        var oLogo = createBitmap(oSprite);
        oLogo.regX = oSprite.width/2;
        oLogo.regY = oSprite.height/2;
        oLogo.x = CANVAS_WIDTH/2;
        oLogo.y = 950;
        _oContainer.addChild(oLogo);

       
        var iWidth = 600;
        var iHeight = 60;
        var iTextX = CANVAS_WIDTH/2;
        var iTextY = 1040;
        var oLink = new CTLText(_oContainer, 
                    iTextX-iWidth/2, iTextY-iHeight/2, iWidth, iHeight, 
                    44, "center", "#fff", "Arial", 1,
                    2, 2,
                    "www.codethislab.com",
                    true, true, true,
                    false );
    };
    
    this.unload = function(){
        _oHitArea.off("click", _oListener);
        
        _oButExit.unload(); 
        _oButExit = null;

        s_oStage.removeChild(_oContainer);
    };
    
    this._onLogoButRelease = function(){
        window.open("http://www.codethislab.com/index.php?&l=en");
    };
    
    this._init();
    
    
};


