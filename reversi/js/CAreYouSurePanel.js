function CAreYouSurePanel(oFunction) {

    var _oTitleStroke;
    var _oTitle;
    var _oButYes;
    var _oButNo;
    var _oFade;
    var _oPanelContainer;
    var _oParent;
    var _oListener;
    
    var _pStartPanelPos;

    this._init = function (oFunction) {
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("mousedown",function(){});
        s_oStage.addChild(_oFade);
        
        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;  

        
        _oTitleStroke = new createjs.Text(TEXT_ARE_SURE," 100px "+PRIMARY_FONT, "#000000");
        _oTitleStroke.y = - 220;
        _oTitleStroke.textAlign = "center";
        _oTitleStroke.textBaseline = "middle";
        _oTitleStroke.lineWidth = 600;
        _oTitleStroke.outline = 5;

        _oTitle = new createjs.Text(TEXT_ARE_SURE," 100px "+PRIMARY_FONT, "#ffffff");
        _oTitle.y = _oTitleStroke.y;
        _oTitle.textAlign = "center";
        _oTitle.textBaseline = "middle";
        _oTitle.lineWidth = 600;
        _oPanelContainer.addChild(_oTitle);

        _oButYes = new CGfxButton(150, 150, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(-150, 150, s_oSpriteLibrary.getSprite('but_no'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        _oButNo.pulseAnimation();
    };

    this._onButYes = function () {

        _oParent.unload();
        oFunction();
    };

    this._onButNo = function () {

        _oParent.unload();
    };

    this.changeMessage = function(szText, iFontSize){
        _oTitleStroke.text = szText;
        _oTitle.text = szText;
        
        if(iFontSize){
            _oTitleStroke.font = " "+iFontSize +"px "+PRIMARY_FONT;
            _oTitle.font = " "+iFontSize +"px "+PRIMARY_FONT;
        }
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();

        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);

        _oFade.off("mousedown",_oListener);
    };

    _oParent = this;
    this._init(oFunction);
}

