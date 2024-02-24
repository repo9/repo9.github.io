var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 1920;

var EDGEBOARD_X = 190;
var EDGEBOARD_Y = 220;

var FPS = 30;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE =false;

var PRIMARY_FONT = "arialrounded";

var SOUNDTRACK_VOLUME_IN_GAME = 1;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var MODE_HUMAN     = 0;
var MODE_COMPUTER  = 1;

var EASY_MODE = 0;
var MEDIUM_MODE = 1;
var HARD_MODE = 2;

var PAWN_BLACK = 0;
var PAWN_WHITE = 1;
var PAWN_NULL = -1;

var ALERT_TYPE_NOMOVES = 0;
var ALERT_TYPE_STALL = 1;

var BOARD_LENGTH  = 784;
var NUM_CELL      = 8;
var TOT_CELL      = 64;
var CELL_LENGTH   = BOARD_LENGTH/NUM_CELL;
var PAWN_SIZE     = 96;

var TIME_LOOP_WAIT = 1000;
var MIN_AI_THINKING   = 1000;
var MAX_AI_THINKING   = 1500;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;