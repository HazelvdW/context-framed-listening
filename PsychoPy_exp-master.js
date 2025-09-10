/**************************** 
 * Psychopy_Exp-Master *
 ****************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.2.3.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'PsychoPy_exp-master';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
    'PROLIFIC_ID': '{{%PROLIFIC_PID%}}',
};

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: false,
  color: new util.Color([1.0, 1.0, 1.0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(welcomeRoutineBegin());
flowScheduler.add(welcomeRoutineEachFrame());
flowScheduler.add(welcomeRoutineEnd());
flowScheduler.add(volume_checkRoutineBegin());
flowScheduler.add(volume_checkRoutineEachFrame());
flowScheduler.add(volume_checkRoutineEnd());
flowScheduler.add(McdermottLab_HeadphoneCheck_introRoutineBegin());
flowScheduler.add(McdermottLab_HeadphoneCheck_introRoutineEachFrame());
flowScheduler.add(McdermottLab_HeadphoneCheck_introRoutineEnd());
flowScheduler.add(MLHC_1RoutineBegin());
flowScheduler.add(MLHC_1RoutineEachFrame());
flowScheduler.add(MLHC_1RoutineEnd());
flowScheduler.add(MLHC_2RoutineBegin());
flowScheduler.add(MLHC_2RoutineEachFrame());
flowScheduler.add(MLHC_2RoutineEnd());
flowScheduler.add(MLHC_3RoutineBegin());
flowScheduler.add(MLHC_3RoutineEachFrame());
flowScheduler.add(MLHC_3RoutineEnd());
flowScheduler.add(MLHC_4RoutineBegin());
flowScheduler.add(MLHC_4RoutineEachFrame());
flowScheduler.add(MLHC_4RoutineEnd());
flowScheduler.add(MLHC_5RoutineBegin());
flowScheduler.add(MLHC_5RoutineEachFrame());
flowScheduler.add(MLHC_5RoutineEnd());
flowScheduler.add(MLHC_6RoutineBegin());
flowScheduler.add(MLHC_6RoutineEachFrame());
flowScheduler.add(MLHC_6RoutineEnd());
const headphone_check_failedLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(headphone_check_failedLoopBegin(headphone_check_failedLoopScheduler));
flowScheduler.add(headphone_check_failedLoopScheduler);
flowScheduler.add(headphone_check_failedLoopEnd);


flowScheduler.add(info_sheetRoutineBegin());
flowScheduler.add(info_sheetRoutineEachFrame());
flowScheduler.add(info_sheetRoutineEnd());
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());
flowScheduler.add(AI_noticeRoutineBegin());
flowScheduler.add(AI_noticeRoutineEachFrame());
flowScheduler.add(AI_noticeRoutineEnd());
flowScheduler.add(instructionsRoutineBegin());
flowScheduler.add(instructionsRoutineEachFrame());
flowScheduler.add(instructionsRoutineEnd());
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);
















flowScheduler.add(demographicsRoutineBegin());
flowScheduler.add(demographicsRoutineEachFrame());
flowScheduler.add(demographicsRoutineEnd());
flowScheduler.add(debriefRoutineBegin());
flowScheduler.add(debriefRoutineEachFrame());
flowScheduler.add(debriefRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // libraries:
    {'surveyLibrary': true},
    // resources:
    {'name': 'resources/clips_cues_G3.xlsx', 'path': 'resources/clips_cues_G3.xlsx'},
    {'name': 'resources/80s_LOW_02_Breaking_Away.mp3', 'path': 'resources/80s_LOW_02_Breaking_Away.mp3'},
    {'name': 'resources/80s_LOW_06_Summer_Beach.mp3', 'path': 'resources/80s_LOW_06_Summer_Beach.mp3'},
    {'name': 'resources/80s_MED_08_After_Tonight.mp3', 'path': 'resources/80s_MED_08_After_Tonight.mp3'},
    {'name': 'resources/80s_MED_13_Your_Love_Drives_Me_Crazy.mp3', 'path': 'resources/80s_MED_13_Your_Love_Drives_Me_Crazy.mp3'},
    {'name': 'resources/Electronic_LOW_09_Expansion.mp3', 'path': 'resources/Electronic_LOW_09_Expansion.mp3'},
    {'name': 'resources/Electronic_LOW_14_Tape.mp3', 'path': 'resources/Electronic_LOW_14_Tape.mp3'},
    {'name': 'resources/Electronic_MED_19_Looped.mp3', 'path': 'resources/Electronic_MED_19_Looped.mp3'},
    {'name': 'resources/Electronic_MED_20_The_Distance.mp3', 'path': 'resources/Electronic_MED_20_The_Distance.mp3'},
    {'name': 'resources/Jazz_LOW_19_Sembellogy.mp3', 'path': 'resources/Jazz_LOW_19_Sembellogy.mp3'},
    {'name': 'resources/Jazz_LOW_21_Thinking_of_You_Mjq.mp3', 'path': 'resources/Jazz_LOW_21_Thinking_of_You_Mjq.mp3'},
    {'name': 'resources/Jazz_MED_02_I_Guess_Ill_Hang_My_Tears_Out_To_Dry_-_Rudy_Van_Gelder_Edition_Remastered_1999.mp3', 'path': 'resources/Jazz_MED_02_I_Guess_Ill_Hang_My_Tears_Out_To_Dry_-_Rudy_Van_Gelder_Edition_Remastered_1999.mp3'},
    {'name': 'resources/Jazz_MED_07_Turiya_and_Ramakrishna.mp3', 'path': 'resources/Jazz_MED_07_Turiya_and_Ramakrishna.mp3'},
    {'name': 'resources/Metal_LOW_09_Darkside.mp3', 'path': 'resources/Metal_LOW_09_Darkside.mp3'},
    {'name': 'resources/Metal_LOW_14_Viaje_Por_Existir.mp3', 'path': 'resources/Metal_LOW_14_Viaje_Por_Existir.mp3'},
    {'name': 'resources/Metal_MED_19_Thunderhorse.mp3', 'path': 'resources/Metal_MED_19_Thunderhorse.mp3'},
    {'name': 'resources/Metal_MED_20_Welcome_to_the_Family.mp3', 'path': 'resources/Metal_MED_20_Welcome_to_the_Family.mp3'},
    {'name': 'resources/vol_test_quiet-daniel.mp3-blurred_moon.mp3', 'path': 'resources/vol_test_quiet-daniel.mp3-blurred_moon.mp3'},
    {'name': 'resources/vol_test_loud-min_kang-lucy.mp3', 'path': 'resources/vol_test_loud-min_kang-lucy.mp3'},
    {'name': 'resources/antiphase_HC_OIS.wav', 'path': 'resources/antiphase_HC_OIS.wav'},
    {'name': 'resources/antiphase_HC_OSI.wav', 'path': 'resources/antiphase_HC_OSI.wav'},
    {'name': 'resources/antiphase_HC_SIO.wav', 'path': 'resources/antiphase_HC_SIO.wav'},
    {'name': 'resources/antiphase_HC_SOI.wav', 'path': 'resources/antiphase_HC_SOI.wav'},
    {'name': 'resources/antiphase_HC_IOS.wav', 'path': 'resources/antiphase_HC_IOS.wav'},
    {'name': 'resources/antiphase_HC_ISO.wav', 'path': 'resources/antiphase_HC_ISO.wav'},
    {'name': 'resources/vol_icon.png', 'path': 'resources/vol_icon.png'},
    {'name': 'resources/foil_banana.mp3', 'path': 'resources/foil_banana.mp3'},
    {'name': 'resources/survey_demographics.json', 'path': 'resources/survey_demographics.json'},
    {'name': 'resources/80s_LOW_02_Breaking_Away.mp3', 'path': 'resources/80s_LOW_02_Breaking_Away.mp3'},
    {'name': 'resources/80s_LOW_06_Summer_Beach.mp3', 'path': 'resources/80s_LOW_06_Summer_Beach.mp3'},
    {'name': 'resources/80s_MED_08_After_Tonight.mp3', 'path': 'resources/80s_MED_08_After_Tonight.mp3'},
    {'name': 'resources/80s_MED_13_Your_Love_Drives_Me_Crazy.mp3', 'path': 'resources/80s_MED_13_Your_Love_Drives_Me_Crazy.mp3'},
    {'name': 'resources/antiphase_HC_IOS.wav', 'path': 'resources/antiphase_HC_IOS.wav'},
    {'name': 'resources/antiphase_HC_ISO.wav', 'path': 'resources/antiphase_HC_ISO.wav'},
    {'name': 'resources/antiphase_HC_OIS.wav', 'path': 'resources/antiphase_HC_OIS.wav'},
    {'name': 'resources/antiphase_HC_OSI.wav', 'path': 'resources/antiphase_HC_OSI.wav'},
    {'name': 'resources/antiphase_HC_SIO.wav', 'path': 'resources/antiphase_HC_SIO.wav'},
    {'name': 'resources/antiphase_HC_SOI.wav', 'path': 'resources/antiphase_HC_SOI.wav'},
    {'name': 'resources/clips_cues_G3.xlsx', 'path': 'resources/clips_cues_G3.xlsx'},
    {'name': 'resources/Electronic_LOW_09_Expansion.mp3', 'path': 'resources/Electronic_LOW_09_Expansion.mp3'},
    {'name': 'resources/Electronic_LOW_14_Tape.mp3', 'path': 'resources/Electronic_LOW_14_Tape.mp3'},
    {'name': 'resources/Electronic_MED_19_Looped.mp3', 'path': 'resources/Electronic_MED_19_Looped.mp3'},
    {'name': 'resources/Electronic_MED_20_The_Distance.mp3', 'path': 'resources/Electronic_MED_20_The_Distance.mp3'},
    {'name': 'resources/foil_banana.mp3', 'path': 'resources/foil_banana.mp3'},
    {'name': 'resources/Jazz_LOW_19_Sembellogy.mp3', 'path': 'resources/Jazz_LOW_19_Sembellogy.mp3'},
    {'name': 'resources/Jazz_LOW_21_Thinking_of_You_Mjq.mp3', 'path': 'resources/Jazz_LOW_21_Thinking_of_You_Mjq.mp3'},
    {'name': 'resources/Jazz_MED_02_I_Guess_Ill_Hang_My_Tears_Out_To_Dry_-_Rudy_Van_Gelder_Edition_Remastered_1999.mp3', 'path': 'resources/Jazz_MED_02_I_Guess_Ill_Hang_My_Tears_Out_To_Dry_-_Rudy_Van_Gelder_Edition_Remastered_1999.mp3'},
    {'name': 'resources/Jazz_MED_07_Turiya_and_Ramakrishna.mp3', 'path': 'resources/Jazz_MED_07_Turiya_and_Ramakrishna.mp3'},
    {'name': 'resources/Metal_LOW_09_Darkside.mp3', 'path': 'resources/Metal_LOW_09_Darkside.mp3'},
    {'name': 'resources/Metal_LOW_14_Viaje_Por_Existir.mp3', 'path': 'resources/Metal_LOW_14_Viaje_Por_Existir.mp3'},
    {'name': 'resources/Metal_MED_19_Thunderhorse.mp3', 'path': 'resources/Metal_MED_19_Thunderhorse.mp3'},
    {'name': 'resources/Metal_MED_20_Welcome_to_the_Family.mp3', 'path': 'resources/Metal_MED_20_Welcome_to_the_Family.mp3'},
    {'name': 'resources/noise_calib_stim.wav', 'path': 'resources/noise_calib_stim.wav'},
    {'name': 'resources/survey_demographics.json', 'path': 'resources/survey_demographics.json'},
    {'name': 'resources/vol_icon.png', 'path': 'resources/vol_icon.png'},
    {'name': 'resources/vol_test_loud-min_kang-lucy.mp3', 'path': 'resources/vol_test_loud-min_kang-lucy.mp3'},
    {'name': 'resources/vol_test_quiet-daniel.mp3-blurred_moon.mp3', 'path': 'resources/vol_test_quiet-daniel.mp3-blurred_moon.mp3'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.2.3';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  psychoJS.setRedirectUrls('https://app.prolific.com/submissions/complete?cc=CZLFT2MY', '');


  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expName}_${expInfo["PROLIFIC_ID"]}_${expInfo["participant"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var welcomeClock;
var text_WELCOME;
var confirm_button;
var mouse_WELCOME;
var volume_checkClock;
var title_VOL;
var text_VOL;
var quiet_VOL;
var loud_VOL;
var play_quiet_VOL;
var play_loud_VOL;
var text_play_quiet;
var text_play_loud;
var mouse_VOL;
var next_button_VOL;
var mouse_next_button_VOL;
var McdermottLab_HeadphoneCheck_introClock;
var instr_MLHC;
var next_button_MLHC;
var mouse_MLHC;
var MLHC_1Clock;
var headphone_check_score;
var title_MLHC_1;
var sound_MLHC_1;
var Q_MLHC_1;
var resp_MLHC_1;
var MLHC_2Clock;
var title_MLHC_2;
var sound_MLHC_2;
var Q_MLHC_2;
var resp_MLHC_2;
var MLHC_3Clock;
var title_MLHC_3;
var sound_MLHC_3;
var Q_MLHC_3;
var resp_MLHC_3;
var MLHC_4Clock;
var title_MLHC_4;
var sound_MLHC_4;
var Q_MLHC_4;
var resp_MLHC_4;
var MLHC_5Clock;
var title_MLHC_5;
var sound_MLHC_5;
var Q_MLHC_5;
var resp_MLHC_5;
var MLHC_6Clock;
var title_MLHC_6;
var sound_MLHC_6;
var Q_MLHC_6;
var resp_MLHC_6;
var MLHC_failClock;
var FAIL_headphonecheck_text;
var info_sheetClock;
var title_INFO;
var names_INFO;
var text_INFO;
var next_button_INFO;
var mouse_INFO;
var consentClock;
var title_CONSENT;
var text_CONSENTinstr;
var tex_CONSENTinstr2;
var text_CONSENTform;
var agree_button_CONSENT;
var mouse_CONSENT;
var AI_noticeClock;
var text_AI_use_warning;
var no_AI_agree_button;
var mouse_AI;
var instructionsClock;
var title_INSTR;
var text_INSTR;
var next_button_INSTR;
var mouse_INSTR;
var clip_presentationClock;
var progress_number;
var attnCheck;
var attnCheck2;
var attnCheck3;
var clip_stimuli;
var cue_stimuli;
var vol_icon;
var progress_text;
var attn_vocalistQClock;
var text_vocalistATTN;
var text_y_n;
var response_vocalistATTN;
var Q_thought_or_notClock;
var text_thought_or_not;
var response_thought_or_not;
var thought_descriptionClock;
var instr_THOUGHT;
var descr_THOUGHT;
var next_button_THOUGHT;
var mouse_THOUGHT;
var thought_ratingsClock;
var Q_music_prompted;
var rating_music_prompted;
var Q_spontaneity;
var rating_spontaneity;
var Q_novelty;
var rating_novelty;
var next_button_TH_RATINGS;
var mouse_TH_RATINGS;
var no_thoughtClock;
var instr_NOT;
var input_NOT;
var next_button_NOT;
var mouse_NOT;
var general_ratingsClock;
var Q_familiarity;
var rating_familiarity;
var Q_enjoyment;
var rating_enjoyment;
var next_button_G_RATINGS;
var mouse_G_RATINGS;
var attn_bananaClock;
var foil_banana;
var textbox_ATTN;
var next_button_ATTN;
var mouse_ATTN;
var attn_spacebarClock;
var foil_spacebar;
var cue_stimuli_ATTN;
var vol_icon_ATTN;
var progress_text_ATTN;
var spacebar_ATTN;
var debriefClock;
var title_DEBRIEF;
var text_DEBRIEF;
var end_button;
var mouse_DEBRIEF;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "welcome"
  welcomeClock = new util.Clock();
  text_WELCOME = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_WELCOME',
    text: 'Welcome!\n\n\nPlease complete this study using \nGoogle Chrome as your browser \nand wear headphones \nso you can hear the music \n\n\n',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [1, 0.5],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  confirm_button = new visual.TextBox({
    win: psychoJS.window,
    name: 'confirm_button',
    text: 'I am ready to listen to some music!',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, (- 0.33)], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [0.65, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  mouse_WELCOME = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_WELCOME.mouseClock = new util.Clock();
  // Initialize components for Routine "volume_check"
  volume_checkClock = new util.Clock();
  title_VOL = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_VOL',
    text: 'Volume Check',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.05], 
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [1, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  text_VOL = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_VOL',
    text: '\n\n\n\nAs this study involves listening to music, we would prefer that you wear headphones \nand that you are in a quiet environment with minimal distractions.\n\nSet your device to a volume at which both music clips below are comfortably heard.\n\n*Press the play buttons one at a time. Each clip will only play once, then you may continue*\n\n\n\n\n\n\n\n\n\n\nPlease leave your device at this same level for the remainder of the study.\n',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.8, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  quiet_VOL = new sound.Sound({
      win: psychoJS.window,
      value: 'A',
      secs: (- 1),
      });
  quiet_VOL.setVolume(0.7);
  loud_VOL = new sound.Sound({
      win: psychoJS.window,
      value: 'A',
      secs: (- 1),
      });
  loud_VOL.setVolume(0.7);
  play_quiet_VOL = new visual.ShapeStim ({
    win: psychoJS.window, name: 'play_quiet_VOL', 
    vertices: [[-[0.2, 0.2][0]/2.0, -[0.2, 0.2][1]/2.0], [+[0.2, 0.2][0]/2.0, -[0.2, 0.2][1]/2.0], [0, [0.2, 0.2][1]/2.0]],
    ori: 90.0, pos: [(- 0.3), (- 0.07)],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.7333), 0.0902, (- 0.7333)]),
    fillColor: new util.Color([0.2078, 0.6078, (- 0.6078)]),
    opacity: undefined, depth: -4, interpolate: true,
  });
  
  play_loud_VOL = new visual.ShapeStim ({
    win: psychoJS.window, name: 'play_loud_VOL', 
    vertices: [[-[0.2, 0.2][0]/2.0, -[0.2, 0.2][1]/2.0], [+[0.2, 0.2][0]/2.0, -[0.2, 0.2][1]/2.0], [0, [0.2, 0.2][1]/2.0]],
    ori: 90.0, pos: [0.3, (- 0.07)],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color([(- 0.7333), (- 0.3598), (- 0.7333)]),
    fillColor: new util.Color([(- 0.7333), 0.0902, (- 0.7333)]),
    opacity: undefined, depth: -5, interpolate: true,
  });
  
  text_play_quiet = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_play_quiet',
    text: '^ click to play quiet example',
    font: 'Arial',
    units: undefined, 
    pos: [(- 0.33), (- 0.2)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -6.0 
  });
  
  text_play_loud = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_play_loud',
    text: '^ click to play loud example',
    font: 'Arial',
    units: undefined, 
    pos: [0.33, (- 0.2)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -7.0 
  });
  
  mouse_VOL = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_VOL.mouseClock = new util.Clock();
  next_button_VOL = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_VOL',
    text: 'Next>>>',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.63, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -9.0 
  });
  
  mouse_next_button_VOL = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_next_button_VOL.mouseClock = new util.Clock();
  // Initialize components for Routine "McdermottLab_HeadphoneCheck_intro"
  McdermottLab_HeadphoneCheck_introClock = new util.Clock();
  instr_MLHC = new visual.TextBox({
    win: psychoJS.window,
    name: 'instr_MLHC',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  next_button_MLHC = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_MLHC',
    text: 'Next>>>',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.63, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  mouse_MLHC = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_MLHC.mouseClock = new util.Clock();
  // Initialize components for Routine "MLHC_1"
  MLHC_1Clock = new util.Clock();
  
  headphone_check_score = 0;
  
  title_MLHC_1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_MLHC_1',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  sound_MLHC_1 = new sound.Sound({
      win: psychoJS.window,
      value: 'resources/antiphase_HC_OIS.wav',
      secs: (- 1),
      });
  sound_MLHC_1.setVolume(1.0);
  Q_MLHC_1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_MLHC_1',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  resp_MLHC_1 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "MLHC_2"
  MLHC_2Clock = new util.Clock();
  title_MLHC_2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_MLHC_2',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  sound_MLHC_2 = new sound.Sound({
      win: psychoJS.window,
      value: 'resources/antiphase_HC_OSI.wav',
      secs: (- 1),
      });
  sound_MLHC_2.setVolume(1.0);
  Q_MLHC_2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_MLHC_2',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  resp_MLHC_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "MLHC_3"
  MLHC_3Clock = new util.Clock();
  title_MLHC_3 = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_MLHC_3',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  sound_MLHC_3 = new sound.Sound({
      win: psychoJS.window,
      value: 'resources/antiphase_HC_SIO.wav',
      secs: (- 1),
      });
  sound_MLHC_3.setVolume(1.0);
  Q_MLHC_3 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_MLHC_3',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  resp_MLHC_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "MLHC_4"
  MLHC_4Clock = new util.Clock();
  
  
  title_MLHC_4 = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_MLHC_4',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  sound_MLHC_4 = new sound.Sound({
      win: psychoJS.window,
      value: 'A',
      secs: (- 1),
      });
  sound_MLHC_4.setVolume(1.0);
  Q_MLHC_4 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_MLHC_4',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  resp_MLHC_4 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "MLHC_5"
  MLHC_5Clock = new util.Clock();
  
  
  title_MLHC_5 = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_MLHC_5',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  sound_MLHC_5 = new sound.Sound({
      win: psychoJS.window,
      value: 'resources/antiphase_HC_IOS.wav',
      secs: (- 1),
      });
  sound_MLHC_5.setVolume(1.0);
  Q_MLHC_5 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_MLHC_5',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  resp_MLHC_5 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "MLHC_6"
  MLHC_6Clock = new util.Clock();
  title_MLHC_6 = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_MLHC_6',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  sound_MLHC_6 = new sound.Sound({
      win: psychoJS.window,
      value: 'A',
      secs: (- 1),
      });
  sound_MLHC_6.setVolume(1.0);
  Q_MLHC_6 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_MLHC_6',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [1.4, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  resp_MLHC_6 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "MLHC_fail"
  MLHC_failClock = new util.Clock();
  FAIL_headphonecheck_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'FAIL_headphonecheck_text',
    text: 'Sorry, your device did not pass the technical check, so you cannot take part in the study. \n\nIf you’d like to try again please make sure you are wearing headphones, and using a computer running Google Chrome. \nOtherwise, please return your submission on Prolific.\n\n~You can close this webpage to exit~',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.033,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "info_sheet"
  info_sheetClock = new util.Clock();
  title_INFO = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_INFO',
    text: 'Information Sheet',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.05], 
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [1, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  names_INFO = new visual.TextBox({
    win: psychoJS.window,
    name: 'names_INFO',
    text: '\n\nSTUDY TITLE: Contextual Framing and Music-Evoked Thoughts\nRESEARCHER(S): Hazel van der Walle, Prof. Kelly Jakubowski\nRESEARCHER CONTACT EMAIL: hazel.a.van-der-walle@durham.ac.uk',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.05], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1.7, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: true,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  text_INFO = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_INFO',
    text: '\n\n\n\n\n\n\n\n\nWHAT IS THIS STUDY ABOUT?\nThis study explores individuals’ descriptions of their experienced thoughts and imaginings while listening to music clips from a range of musical styles accompanied by contextual and associative information.\n\nWHAT WILL PARTICIPATION IN THIS STUDY INVOLVE?\nIn this study you will listen to a set of short music clips and will be asked to describe any thoughts or scenes you imaging during music listening, your experience of the thoughts and the music clips, and some demographic questions.\nThe study should take approximately 30 minutes to complete.\n\nHOW WILL THE DATA BE USED AND STORED?\nThe data will be used in a research project investigating music-evoked thoughts. All data will be analysed and presented in a fully anonymised format, and results of this work may be included in publications, reports, presentations, and other research outputs.\nAll data will be stored electronically, on a password-protected computer and password-protected hard drive. Data will only be shared with other researchers in a fully anonymised format, for research purposes only.\n\nWHAT IF I CHANGE MY MIND?\nYou can withdraw from the study during participation at any time by simply choosing not to continue with the tasks; your data will subsequently be destroyed and will not be used in any further analysis. After completing the study, you will not be able to withdraw your data simply because we are not collecting any personal identifying information that is linked to your research data (e.g. your name or email), so your final research data will be completely de-identified.\n\nWHO CAN I CONTACT IF I HAVE QUESTIONS OR CONCERNS?\nParticipants can contact the PhD researcher, Hazel van der Walle (hazel.a.van-der-walle@durham.ac.uk), or, should you feel unable to contact Hazel, her supervisor, Prof. Kelly Jakubowski (kelly.jakubowski@durham.ac.uk). \n\n\n>THANK YOU FOR READING THIS SECTION<\n\n\n',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.03, 0.005], 
    letterHeight: 0.027,
    lineSpacing: 1.0,
    size: [1.6, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center-left',
    overflow: 'scroll',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  next_button_INFO = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_INFO',
    text: 'Next>>>',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.63, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  mouse_INFO = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_INFO.mouseClock = new util.Clock();
  // Initialize components for Routine "consent"
  consentClock = new util.Clock();
  title_CONSENT = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_CONSENT',
    text: 'Informed Consent',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.05], 
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [1, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  text_CONSENTinstr = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_CONSENTinstr',
    text: '\n\n\n\nPlease read the following informed consent carefully. \n\n',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.8, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: true,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  tex_CONSENTinstr2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'tex_CONSENTinstr2',
    text: '\n\n\n\n \n\nClick the button below to confirm that you AGREE to continue.\nIf you do NOT agree, please close the webpage to return your submission.\n',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.036,
    lineSpacing: 1.0,
    size: [1.8, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  text_CONSENTform = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_CONSENTform',
    text: '\n\n\n\n\n\n\n\n\n\n\n1. I confirm that I have read and understand the Information Sheet for this project.\n\n2. I have had the opportunity to consider the information and ask any questions.\n\n3. I understand that my participation is voluntary. I am free to withdraw during the course of the study without giving any reason. After completing the study, I will not be able to withdraw my data due to automatic anonymisation.\n\n4. I agree to take part in this project.\n\n5. I have been informed about how the data will be used and stored.',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.02, 0], 
    letterHeight: 0.036,
    lineSpacing: 1.0,
    size: [1.6, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  agree_button_CONSENT = new visual.TextBox({
    win: psychoJS.window,
    name: 'agree_button_CONSENT',
    text: 'I consent and agree to all of the above',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.5, (- 0.41)], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [0.45, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -4.0 
  });
  
  mouse_CONSENT = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_CONSENT.mouseClock = new util.Clock();
  // Initialize components for Routine "AI_notice"
  AI_noticeClock = new util.Clock();
  text_AI_use_warning = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_AI_use_warning',
    text: 'Automated AI generated contributions will be rejected. \n\n\nWe are interested in real, human experience during music listening in this study. \nThere are no "right" answers - we want to know what YOU have been thinking!\n\u2028\n\nPlease press the button below to continue if you agree to not use AI. \u2028\nIf you do not agree, please close the webpage to return your submission on Prolific. \u2028\n\n\nThank you in advance.',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.7, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  no_AI_agree_button = new visual.TextBox({
    win: psychoJS.window,
    name: 'no_AI_agree_button',
    text: 'I agree to not use AI in this study',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, (- 0.33)], 
    letterHeight: 0.033,
    lineSpacing: 1.0,
    size: [0.65, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  mouse_AI = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_AI.mouseClock = new util.Clock();
  // Initialize components for Routine "instructions"
  instructionsClock = new util.Clock();
  title_INSTR = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_INSTR',
    text: 'Task Instructions',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.05], 
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [1, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  text_INSTR = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_INSTR',
    text: '\n\n\n\nSometimes when people listen to music, they imagine other thoughts or scenes. \n\n\nIn the following task, you will hear 16 short music clips presented with some contextual information about the setting or situation it might be heard in.\n\nWhile listening to each clip, please simply take note of ANY thoughts or images that come to mind. You will be asked to write some details about these thoughts after each music clip. \n\nThere are no “right” answers to this task – we are simply interested in the diversity of things people think about when listening to music. \nSimilarly, if NO thoughts cross your mind while listening to a particular music clip, please just report this.\n\n\nFor the duration of the study, please try to listen to the music without distraction in a quiet environment.\n\nEach clip will start playing automatically.\n',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.03, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.6, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  next_button_INSTR = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_INSTR',
    text: 'Ready!>>>',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.63, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  mouse_INSTR = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_INSTR.mouseClock = new util.Clock();
  // Initialize components for Routine "clip_presentation"
  clip_presentationClock = new util.Clock();
  // Run 'Begin Experiment' code from prog_attn
  expInfo['userAgent'] = window.navigator.userAgent;
  
  progress_number = 0;
  attnCheck = 0;
  attnCheck2 = 0;
  attnCheck3 = 0;
  clip_stimuli = new sound.Sound({
      win: psychoJS.window,
      value: 'A',
      secs: (- 1),
      });
  clip_stimuli.setVolume(0.7);
  cue_stimuli = new visual.TextStim({
    win: psychoJS.window,
    name: 'cue_stimuli',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.25], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  vol_icon = new visual.ImageStim({
    win : psychoJS.window,
    name : 'vol_icon', units : undefined, 
    image : 'resources/vol_icon.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [0.3, 0.3],
    color : new util.Color([0.0, 0.0, 0.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  progress_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'progress_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.4)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  // Initialize components for Routine "attn_vocalistQ"
  attn_vocalistQClock = new util.Clock();
  text_vocalistATTN = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_vocalistATTN',
    text: 'Did you hear a vocalist in this clip?\n\n\n',
    placeholder: undefined,
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.039,
    lineSpacing: 1.0,
    size: [1.6, 0.5],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: [1.0, 1.0, 1.0],
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  text_y_n = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_y_n',
    text: "\n\nPlease press 'y' on your keyboard for yes, or press 'n' for no.",
    placeholder: undefined,
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.039,
    lineSpacing: 1.0,
    size: [1.6, 0.5],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: [1.0, 1.0, 1.0],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  response_vocalistATTN = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Q_thought_or_not"
  Q_thought_or_notClock = new util.Clock();
  text_thought_or_not = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_thought_or_not',
    text: "Did you imagine any other thoughts or scenes while listening to this music?\n\nPlease press 'y' on your keyboard for yes, or press 'n' for no.",
    placeholder: undefined,
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.039,
    lineSpacing: 1.0,
    size: [1.6, 0.5],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: [1.0, 1.0, 1.0],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  response_thought_or_not = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "thought_description"
  thought_descriptionClock = new util.Clock();
  instr_THOUGHT = new visual.TextBox({
    win: psychoJS.window,
    name: 'instr_THOUGHT',
    text: 'Please describe the thoughts or scenes you imagined in as much detail as possible.\nYou have up to 2-minutes to spend on your response. The "Next" button will appear after 30-seconds.',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.1], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.6, 0.5],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  descr_THOUGHT = new visual.TextBox({
    win: psychoJS.window,
    name: 'descr_THOUGHT',
    text: '',
    placeholder: undefined,
    font: 'Arial',
    pos: [0, (- 0.01)], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.2, 0.44],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: [0.0039, 0.0039, 0.0039],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  next_button_THOUGHT = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_THOUGHT',
    text: '',
    placeholder: 'Type here...',
    font: 'Aptos',
    pos: [0.63, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  mouse_THOUGHT = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_THOUGHT.mouseClock = new util.Clock();
  // Initialize components for Routine "thought_ratings"
  thought_ratingsClock = new util.Clock();
  Q_music_prompted = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_music_prompted',
    text: 'To what degree do you think these thoughts were prompted by the music you just heard?',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.3], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1, 0.2],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  rating_music_prompted = new visual.Slider({
    win: psychoJS.window, name: 'rating_music_prompted',
    startValue: undefined,
    size: [1, 0.03], pos: [0, 0.3], ori: 0.0, units: psychoJS.window.units,
    labels: ["1 \n Not at all \n prompted by the music", 2, 3, 4, "5 \n Entirely prompted \n by the music"], fontSize: 0.025, ticks: [1, 2, 3, 4, 5],
    granularity: 1.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.6078, (- 0.2784), (- 0.2784)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    opacity: undefined, fontFamily: 'Aptos', bold: true, italic: false, depth: -2, 
    flip: false,
  });
  
  Q_spontaneity = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_spontaneity',
    text: 'Please rate the degree to which you deliberately brought these thoughts to mind versus they came to mind spontaneously.',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.0], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1, 0.2],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  rating_spontaneity = new visual.Slider({
    win: psychoJS.window, name: 'rating_spontaneity',
    startValue: undefined,
    size: [1, 0.03], pos: [0, (- 0.01)], ori: 0.0, units: psychoJS.window.units,
    labels: ["1 \n Entirely deliberately", 2, 3, 4, "5 \n Entirely spontaneously"], fontSize: 0.025, ticks: [1, 2, 3, 4, 5],
    granularity: 1.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.6078, (- 0.2784), (- 0.2784)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    opacity: undefined, fontFamily: 'Aptos', bold: true, italic: false, depth: -4, 
    flip: false,
  });
  
  Q_novelty = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_novelty',
    text: 'To what degree were these thoughts memories of things you’ve seen or experienced before, versus things you’ve newly imagined? ',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, (- 0.31)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1, 0.2],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -5.0 
  });
  
  rating_novelty = new visual.Slider({
    win: psychoJS.window, name: 'rating_novelty',
    startValue: undefined,
    size: [1, 0.03], pos: [0, (- 0.31)], ori: 0.0, units: psychoJS.window.units,
    labels: ["1 \n Entirely things I\u2019ve seen \n or experienced before", 2, 3, 4, "5 \n Entirely things I\u2019ve \n newly imagined"], fontSize: 0.025, ticks: [1, 2, 3, 4, 5],
    granularity: 1.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.6078, (- 0.2784), (- 0.2784)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    opacity: undefined, fontFamily: 'Arial', bold: true, italic: false, depth: -6, 
    flip: false,
  });
  
  next_button_TH_RATINGS = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_TH_RATINGS',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.74, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -7.0 
  });
  
  mouse_TH_RATINGS = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_TH_RATINGS.mouseClock = new util.Clock();
  // Initialize components for Routine "no_thought"
  no_thoughtClock = new util.Clock();
  instr_NOT = new visual.TextBox({
    win: psychoJS.window,
    name: 'instr_NOT',
    text: 'Why do you think you didn’t imagine any thoughts or scenes during this music? \nPlease answer this question in as much detail as possible. You have up to 2-minutes to spend on your response. The "Next" button will appear after 30-seconds.',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.12], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.6, 0.5],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  input_NOT = new visual.TextBox({
    win: psychoJS.window,
    name: 'input_NOT',
    text: '',
    placeholder: undefined,
    font: 'Arial',
    pos: [0, (- 0.01)], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [1.2, 0.44],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: [(- 1.0), (- 1.0), (- 1.0)],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  next_button_NOT = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_NOT',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.63, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  mouse_NOT = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_NOT.mouseClock = new util.Clock();
  // Initialize components for Routine "general_ratings"
  general_ratingsClock = new util.Clock();
  Q_familiarity = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_familiarity',
    text: 'How often have you heard this specific song/piece before today?',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.3], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1, 0.2],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  rating_familiarity = new visual.Slider({
    win: psychoJS.window, name: 'rating_familiarity',
    startValue: undefined,
    size: [1, 0.03], pos: [0, 0.3], ori: 0.0, units: psychoJS.window.units,
    labels: ["1 \n Never heard\u202f", 2, 3, 4, "5 \n Heard a lot"], fontSize: 0.025, ticks: [1, 2, 3, 4, 5],
    granularity: 1.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.6078, (- 0.2784), (- 0.2784)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    opacity: undefined, fontFamily: 'Aptos', bold: true, italic: false, depth: -2, 
    flip: false,
  });
  
  Q_enjoyment = new visual.TextBox({
    win: psychoJS.window,
    name: 'Q_enjoyment',
    text: 'How much did you enjoy listening to this music?',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.0], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1, 0.2],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-left',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -3.0 
  });
  
  rating_enjoyment = new visual.Slider({
    win: psychoJS.window, name: 'rating_enjoyment',
    startValue: undefined,
    size: [1, 0.03], pos: [0, (- 0.01)], ori: 0.0, units: psychoJS.window.units,
    labels: ["1 \n Not at all\u202f\u202f", 2, 3, 4, "5 \n Very much so"], fontSize: 0.025, ticks: [1, 2, 3, 4, 5],
    granularity: 1.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.6078, (- 0.2784), (- 0.2784)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    opacity: undefined, fontFamily: 'Aptos', bold: true, italic: false, depth: -4, 
    flip: false,
  });
  
  next_button_G_RATINGS = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_G_RATINGS',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.74, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -5.0 
  });
  
  mouse_G_RATINGS = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_G_RATINGS.mouseClock = new util.Clock();
  // Initialize components for Routine "attn_banana"
  attn_bananaClock = new util.Clock();
  foil_banana = new sound.Sound({
      win: psychoJS.window,
      value: 'A',
      secs: (- 1),
      });
  foil_banana.setVolume(1.0);
  textbox_ATTN = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox_ATTN',
    text: '',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [0.6, 0.3],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: [(- 1.0), (- 1.0), (- 1.0)],
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  next_button_ATTN = new visual.TextBox({
    win: psychoJS.window,
    name: 'next_button_ATTN',
    text: 'Next>>>',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.63, (- 0.41)], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [0.2, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  mouse_ATTN = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_ATTN.mouseClock = new util.Clock();
  // Initialize components for Routine "attn_spacebar"
  attn_spacebarClock = new util.Clock();
  foil_spacebar = new sound.Sound({
      win: psychoJS.window,
      value: 'resources/foil_spacebar.mp3',
      secs: (- 1),
      });
  foil_spacebar.setVolume(0.7);
  cue_stimuli_ATTN = new visual.TextStim({
    win: psychoJS.window,
    name: 'cue_stimuli_ATTN',
    text: 'Heard in a video game',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.25], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  vol_icon_ATTN = new visual.ImageStim({
    win : psychoJS.window,
    name : 'vol_icon_ATTN', units : undefined, 
    image : 'resources/vol_icon.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [0.3, 0.3],
    color : new util.Color([0.0, 0.0, 0.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  progress_text_ATTN = new visual.TextStim({
    win: psychoJS.window,
    name: 'progress_text_ATTN',
    text: '[Clip number 9 of 16]',
    font: 'Arial',
    units: undefined, 
    pos: [0, (- 0.4)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  spacebar_ATTN = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "debrief"
  debriefClock = new util.Clock();
  title_DEBRIEF = new visual.TextBox({
    win: psychoJS.window,
    name: 'title_DEBRIEF',
    text: 'Debrief',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0, 0.05], 
    letterHeight: 0.05,
    lineSpacing: 1.0,
    size: [1, 0.8],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: true, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'top-center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  text_DEBRIEF = new visual.TextBox({
    win: psychoJS.window,
    name: 'text_DEBRIEF',
    text: '\n\nYou have now reached the end of the study!\n\nThank you very much for taking the time to participate and complete our study — your responses are greatly appreciated.\n\nThis research aims to improve our understanding of the different types of thoughts and imaginings cued by music across a range of musical styles, and how these are influenced by contextual associations.\n\nSpecifically, we are investigating whether listeners’ music-evoked thoughts are shaped significantly by extra-musical information and associations of to the music they are listening to — even when these associations are newly introduced or not personally formed by the listener. The findings will help guide future studies on music-evoked thoughts, including autobiographical memories, fictional stories, abstract visual imagery, mind-wandering, and multimodal imaginings.\n\nTo date, much of the research in this area has focused on a single type of thought and used a limited range of musical genres, tending to examine contextual associations as an afterthought explanation to variance in results and overlooking context and associative stimuli cues. This study contributes to broadening that scope.\n\nYour participation is incredibly valuable to us and much future research, and we are very grateful for your involvement — thank you again.\n\nPlease be assured that all data collected will be kept strictly confidential and used only for research purposes.\n\nIf you have any further questions or concerns about the study, please contact the lead researcher, Hazel van der Walle (hazel.a.van-der-walle@durham.ac.uk), or her supervisor, Prof. Kelly Jakubowski (kelly.jakubowksi@durham.ac.uk).\n\n\n\n',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.02, 0], 
    letterHeight: 0.03,
    lineSpacing: 1.0,
    size: [1.6, 1],  units: undefined, 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center-left',
    overflow: 'scroll',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  end_button = new visual.TextBox({
    win: psychoJS.window,
    name: 'end_button',
    text: 'Click here to finish the study :)',
    placeholder: 'Type here...',
    font: 'Arial',
    pos: [0.5, (- 0.41)], 
    letterHeight: 0.04,
    lineSpacing: 1.0,
    size: [0.45, 0.1],  units: undefined, 
    color: 'white', colorSpace: 'rgb',
    fillColor: [0.0902, (- 1.0), (- 1.0)], borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -2.0 
  });
  
  mouse_DEBRIEF = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_DEBRIEF.mouseClock = new util.Clock();
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var welcomeComponents;
function welcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcome' ---
    t = 0;
    welcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('welcome.started', globalClock.getTime());
    // setup some python lists for storing info about the mouse_WELCOME
    mouse_WELCOME.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    welcomeComponents = [];
    welcomeComponents.push(text_WELCOME);
    welcomeComponents.push(confirm_button);
    welcomeComponents.push(mouse_WELCOME);
    
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
var prevButtonState;
var _mouseButtons;
function welcomeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcome' ---
    // get current time
    t = welcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_WELCOME* updates
    if (t >= 0.0 && text_WELCOME.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_WELCOME.tStart = t;  // (not accounting for frame time here)
      text_WELCOME.frameNStart = frameN;  // exact frame index
      
      text_WELCOME.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_WELCOME.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_WELCOME.setAutoDraw(false);
    }
    
    // *confirm_button* updates
    if (t >= 0.0 && confirm_button.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      confirm_button.tStart = t;  // (not accounting for frame time here)
      confirm_button.frameNStart = frameN;  // exact frame index
      
      confirm_button.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (confirm_button.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      confirm_button.setAutoDraw(false);
    }
    // *mouse_WELCOME* updates
    if (t >= 0.3 && mouse_WELCOME.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_WELCOME.tStart = t;  // (not accounting for frame time here)
      mouse_WELCOME.frameNStart = frameN;  // exact frame index
      
      mouse_WELCOME.status = PsychoJS.Status.STARTED;
      mouse_WELCOME.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 0.3 + 59.7 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_WELCOME.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_WELCOME.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_WELCOME.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_WELCOME.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [confirm_button]) {
            if (obj.contains(mouse_WELCOME)) {
              gotValidClick = true;
              mouse_WELCOME.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function welcomeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcome' ---
    for (const thisComponent of welcomeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('welcome.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var volume_checkComponents;
function volume_checkRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'volume_check' ---
    t = 0;
    volume_checkClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('volume_check.started', globalClock.getTime());
    quiet_VOL.setValue('resources/vol_test_quiet-daniel.mp3-blurred_moon.mp3');
    quiet_VOL.setVolume(0.7);
    loud_VOL.setValue('resources/vol_test_loud-min_kang-lucy.mp3');
    loud_VOL.setVolume(0.7);
    // setup some python lists for storing info about the mouse_VOL
    mouse_VOL.clicked_name = [];
    gotValidClick = false; // until a click is received
    // setup some python lists for storing info about the mouse_next_button_VOL
    // current position of the mouse:
    mouse_next_button_VOL.x = [];
    mouse_next_button_VOL.y = [];
    mouse_next_button_VOL.leftButton = [];
    mouse_next_button_VOL.midButton = [];
    mouse_next_button_VOL.rightButton = [];
    mouse_next_button_VOL.time = [];
    mouse_next_button_VOL.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    volume_checkComponents = [];
    volume_checkComponents.push(title_VOL);
    volume_checkComponents.push(text_VOL);
    volume_checkComponents.push(quiet_VOL);
    volume_checkComponents.push(loud_VOL);
    volume_checkComponents.push(play_quiet_VOL);
    volume_checkComponents.push(play_loud_VOL);
    volume_checkComponents.push(text_play_quiet);
    volume_checkComponents.push(text_play_loud);
    volume_checkComponents.push(mouse_VOL);
    volume_checkComponents.push(next_button_VOL);
    volume_checkComponents.push(mouse_next_button_VOL);
    
    for (const thisComponent of volume_checkComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var _mouseXYs;
function volume_checkRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'volume_check' ---
    // get current time
    t = volume_checkClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_VOL* updates
    if (t >= 0.0 && title_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_VOL.tStart = t;  // (not accounting for frame time here)
      title_VOL.frameNStart = frameN;  // exact frame index
      
      title_VOL.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_VOL.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_VOL.setAutoDraw(false);
    }
    
    // *text_VOL* updates
    if (t >= 0.0 && text_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_VOL.tStart = t;  // (not accounting for frame time here)
      text_VOL.frameNStart = frameN;  // exact frame index
      
      text_VOL.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_VOL.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_VOL.setAutoDraw(false);
    }
    // start/stop quiet_VOL
    if ((mouse_VOL.isPressedIn(play_quiet_VOL)) && quiet_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      quiet_VOL.tStart = t;  // (not accounting for frame time here)
      quiet_VOL.frameNStart = frameN;  // exact frame index
      
      quiet_VOL.play();  // start the sound (it finishes automatically)
      quiet_VOL.status = PsychoJS.Status.STARTED;
    }
    if (t >= (quiet_VOL.getDuration() + quiet_VOL.tStart)     && quiet_VOL.status === PsychoJS.Status.STARTED) {
      quiet_VOL.stop();  // stop the sound (if longer than duration)
      quiet_VOL.status = PsychoJS.Status.FINISHED;
    }
    // start/stop loud_VOL
    if ((mouse_VOL.isPressedIn(play_loud_VOL)) && loud_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      loud_VOL.tStart = t;  // (not accounting for frame time here)
      loud_VOL.frameNStart = frameN;  // exact frame index
      
      loud_VOL.play();  // start the sound (it finishes automatically)
      loud_VOL.status = PsychoJS.Status.STARTED;
    }
    if (t >= (loud_VOL.getDuration() + loud_VOL.tStart)     && loud_VOL.status === PsychoJS.Status.STARTED) {
      loud_VOL.stop();  // stop the sound (if longer than duration)
      loud_VOL.status = PsychoJS.Status.FINISHED;
    }
    
    // *play_quiet_VOL* updates
    if (t >= 0.0 && play_quiet_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      play_quiet_VOL.tStart = t;  // (not accounting for frame time here)
      play_quiet_VOL.frameNStart = frameN;  // exact frame index
      
      play_quiet_VOL.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (play_quiet_VOL.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      play_quiet_VOL.setAutoDraw(false);
    }
    
    // *play_loud_VOL* updates
    if (t >= 0.0 && play_loud_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      play_loud_VOL.tStart = t;  // (not accounting for frame time here)
      play_loud_VOL.frameNStart = frameN;  // exact frame index
      
      play_loud_VOL.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (play_loud_VOL.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      play_loud_VOL.setAutoDraw(false);
    }
    
    // *text_play_quiet* updates
    if (t >= 0.0 && text_play_quiet.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_play_quiet.tStart = t;  // (not accounting for frame time here)
      text_play_quiet.frameNStart = frameN;  // exact frame index
      
      text_play_quiet.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_play_quiet.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_play_quiet.setAutoDraw(false);
    }
    
    // *text_play_loud* updates
    if (t >= 0.0 && text_play_loud.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_play_loud.tStart = t;  // (not accounting for frame time here)
      text_play_loud.frameNStart = frameN;  // exact frame index
      
      text_play_loud.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_play_loud.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_play_loud.setAutoDraw(false);
    }
    
    // *next_button_VOL* updates
    if (t >= 0.0 && next_button_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_VOL.tStart = t;  // (not accounting for frame time here)
      next_button_VOL.frameNStart = frameN;  // exact frame index
      
      next_button_VOL.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_button_VOL.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_button_VOL.setAutoDraw(false);
    }
    // *mouse_next_button_VOL* updates
    if (t >= 3.0 && mouse_next_button_VOL.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_next_button_VOL.tStart = t;  // (not accounting for frame time here)
      mouse_next_button_VOL.frameNStart = frameN;  // exact frame index
      
      mouse_next_button_VOL.status = PsychoJS.Status.STARTED;
      mouse_next_button_VOL.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 3.0 + 117 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_next_button_VOL.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_next_button_VOL.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_next_button_VOL.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_next_button_VOL.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_VOL]) {
            if (obj.contains(mouse_next_button_VOL)) {
              gotValidClick = true;
              mouse_next_button_VOL.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = mouse_next_button_VOL.getPos();
          mouse_next_button_VOL.x.push(_mouseXYs[0]);
          mouse_next_button_VOL.y.push(_mouseXYs[1]);
          mouse_next_button_VOL.leftButton.push(_mouseButtons[0]);
          mouse_next_button_VOL.midButton.push(_mouseButtons[1]);
          mouse_next_button_VOL.rightButton.push(_mouseButtons[2]);
          mouse_next_button_VOL.time.push(mouse_next_button_VOL.mouseClock.getTime());
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of volume_checkComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function volume_checkRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'volume_check' ---
    for (const thisComponent of volume_checkComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('volume_check.stopped', globalClock.getTime());
    quiet_VOL.stop();  // ensure sound has stopped at end of Routine
    loud_VOL.stop();  // ensure sound has stopped at end of Routine
    // store data for psychoJS.experiment (ExperimentHandler)
    // store data for psychoJS.experiment (ExperimentHandler)
    if (mouse_next_button_VOL.x) {  psychoJS.experiment.addData('mouse_next_button_VOL.x', mouse_next_button_VOL.x[0])};
    if (mouse_next_button_VOL.y) {  psychoJS.experiment.addData('mouse_next_button_VOL.y', mouse_next_button_VOL.y[0])};
    if (mouse_next_button_VOL.leftButton) {  psychoJS.experiment.addData('mouse_next_button_VOL.leftButton', mouse_next_button_VOL.leftButton[0])};
    if (mouse_next_button_VOL.midButton) {  psychoJS.experiment.addData('mouse_next_button_VOL.midButton', mouse_next_button_VOL.midButton[0])};
    if (mouse_next_button_VOL.rightButton) {  psychoJS.experiment.addData('mouse_next_button_VOL.rightButton', mouse_next_button_VOL.rightButton[0])};
    if (mouse_next_button_VOL.time) {  psychoJS.experiment.addData('mouse_next_button_VOL.time', mouse_next_button_VOL.time[0])};
    if (mouse_next_button_VOL.clicked_name) {  psychoJS.experiment.addData('mouse_next_button_VOL.clicked_name', mouse_next_button_VOL.clicked_name[0])};
    
    // the Routine "volume_check" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var McdermottLab_HeadphoneCheck_introComponents;
function McdermottLab_HeadphoneCheck_introRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'McdermottLab_HeadphoneCheck_intro' ---
    t = 0;
    McdermottLab_HeadphoneCheck_introClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('McdermottLab_HeadphoneCheck_intro.started', globalClock.getTime());
    instr_MLHC.setText('Let\'s do a brief technical check now. \nPlease ensure you are wearing headphones.\n\n\nYou will hear 3 tones one by one. \nYour task is to judge which tone is quietest. \n\nThere are 6 task trials in total. \n\n\nPress the "Next" button below to begin.');
    // setup some python lists for storing info about the mouse_MLHC
    // current position of the mouse:
    mouse_MLHC.x = [];
    mouse_MLHC.y = [];
    mouse_MLHC.leftButton = [];
    mouse_MLHC.midButton = [];
    mouse_MLHC.rightButton = [];
    mouse_MLHC.time = [];
    mouse_MLHC.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    McdermottLab_HeadphoneCheck_introComponents = [];
    McdermottLab_HeadphoneCheck_introComponents.push(instr_MLHC);
    McdermottLab_HeadphoneCheck_introComponents.push(next_button_MLHC);
    McdermottLab_HeadphoneCheck_introComponents.push(mouse_MLHC);
    
    for (const thisComponent of McdermottLab_HeadphoneCheck_introComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function McdermottLab_HeadphoneCheck_introRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'McdermottLab_HeadphoneCheck_intro' ---
    // get current time
    t = McdermottLab_HeadphoneCheck_introClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instr_MLHC* updates
    if (t >= 0 && instr_MLHC.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_MLHC.tStart = t;  // (not accounting for frame time here)
      instr_MLHC.frameNStart = frameN;  // exact frame index
      
      instr_MLHC.setAutoDraw(true);
    }
    
    frameRemains = 0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr_MLHC.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr_MLHC.setAutoDraw(false);
    }
    
    // *next_button_MLHC* updates
    if (t >= 0.0 && next_button_MLHC.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_MLHC.tStart = t;  // (not accounting for frame time here)
      next_button_MLHC.frameNStart = frameN;  // exact frame index
      
      next_button_MLHC.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_button_MLHC.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_button_MLHC.setAutoDraw(false);
    }
    // *mouse_MLHC* updates
    if (t >= 0 && mouse_MLHC.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_MLHC.tStart = t;  // (not accounting for frame time here)
      mouse_MLHC.frameNStart = frameN;  // exact frame index
      
      mouse_MLHC.status = PsychoJS.Status.STARTED;
      mouse_MLHC.mouseClock.reset();
      prevButtonState = mouse_MLHC.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_MLHC.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_MLHC.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_MLHC.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_MLHC.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_MLHC]) {
            if (obj.contains(mouse_MLHC)) {
              gotValidClick = true;
              mouse_MLHC.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = mouse_MLHC.getPos();
          mouse_MLHC.x.push(_mouseXYs[0]);
          mouse_MLHC.y.push(_mouseXYs[1]);
          mouse_MLHC.leftButton.push(_mouseButtons[0]);
          mouse_MLHC.midButton.push(_mouseButtons[1]);
          mouse_MLHC.rightButton.push(_mouseButtons[2]);
          mouse_MLHC.time.push(mouse_MLHC.mouseClock.getTime());
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of McdermottLab_HeadphoneCheck_introComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function McdermottLab_HeadphoneCheck_introRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'McdermottLab_HeadphoneCheck_intro' ---
    for (const thisComponent of McdermottLab_HeadphoneCheck_introComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('McdermottLab_HeadphoneCheck_intro.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    if (mouse_MLHC.x) {  psychoJS.experiment.addData('mouse_MLHC.x', mouse_MLHC.x[0])};
    if (mouse_MLHC.y) {  psychoJS.experiment.addData('mouse_MLHC.y', mouse_MLHC.y[0])};
    if (mouse_MLHC.leftButton) {  psychoJS.experiment.addData('mouse_MLHC.leftButton', mouse_MLHC.leftButton[0])};
    if (mouse_MLHC.midButton) {  psychoJS.experiment.addData('mouse_MLHC.midButton', mouse_MLHC.midButton[0])};
    if (mouse_MLHC.rightButton) {  psychoJS.experiment.addData('mouse_MLHC.rightButton', mouse_MLHC.rightButton[0])};
    if (mouse_MLHC.time) {  psychoJS.experiment.addData('mouse_MLHC.time', mouse_MLHC.time[0])};
    if (mouse_MLHC.clicked_name) {  psychoJS.experiment.addData('mouse_MLHC.clicked_name', mouse_MLHC.clicked_name[0])};
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _resp_MLHC_1_allKeys;
var MLHC_1Components;
function MLHC_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MLHC_1' ---
    t = 0;
    MLHC_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(66.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('MLHC_1.started', globalClock.getTime());
    title_MLHC_1.setText('Trial 1');
    sound_MLHC_1.secs=5;
    sound_MLHC_1.setVolume(1.0);
    Q_MLHC_1.setText("Which tone was quietest?\n\nPlease press '1' on your keyboard for the first tone, '2' for the second tone, and '3' for the third tone.");
    resp_MLHC_1.keys = undefined;
    resp_MLHC_1.rt = undefined;
    _resp_MLHC_1_allKeys = [];
    // keep track of which components have finished
    MLHC_1Components = [];
    MLHC_1Components.push(title_MLHC_1);
    MLHC_1Components.push(sound_MLHC_1);
    MLHC_1Components.push(Q_MLHC_1);
    MLHC_1Components.push(resp_MLHC_1);
    
    for (const thisComponent of MLHC_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MLHC_1RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MLHC_1' ---
    // get current time
    t = MLHC_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_MLHC_1* updates
    if (t >= 0 && title_MLHC_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_MLHC_1.tStart = t;  // (not accounting for frame time here)
      title_MLHC_1.frameNStart = frameN;  // exact frame index
      
      title_MLHC_1.setAutoDraw(true);
    }
    
    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_MLHC_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_MLHC_1.setAutoDraw(false);
    }
    // start/stop sound_MLHC_1
    if (t >= 1 && sound_MLHC_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound_MLHC_1.tStart = t;  // (not accounting for frame time here)
      sound_MLHC_1.frameNStart = frameN;  // exact frame index
      
      sound_MLHC_1.play();  // start the sound (it finishes automatically)
      sound_MLHC_1.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sound_MLHC_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= sound_MLHC_1.tStart + 0.5) {
        sound_MLHC_1.stop();  // stop the sound (if longer than duration)
        sound_MLHC_1.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *Q_MLHC_1* updates
    if (t >= 6 && Q_MLHC_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_MLHC_1.tStart = t;  // (not accounting for frame time here)
      Q_MLHC_1.frameNStart = frameN;  // exact frame index
      
      Q_MLHC_1.setAutoDraw(true);
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_MLHC_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_MLHC_1.setAutoDraw(false);
    }
    
    // *resp_MLHC_1* updates
    if (t >= 6 && resp_MLHC_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp_MLHC_1.tStart = t;  // (not accounting for frame time here)
      resp_MLHC_1.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp_MLHC_1.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_1.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_1.clearEvents(); });
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (resp_MLHC_1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      resp_MLHC_1.status = PsychoJS.Status.FINISHED;
        }
      
    if (resp_MLHC_1.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp_MLHC_1.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _resp_MLHC_1_allKeys = _resp_MLHC_1_allKeys.concat(theseKeys);
      if (_resp_MLHC_1_allKeys.length > 0) {
        resp_MLHC_1.keys = _resp_MLHC_1_allKeys[_resp_MLHC_1_allKeys.length - 1].name;  // just the last key pressed
        resp_MLHC_1.rt = _resp_MLHC_1_allKeys[_resp_MLHC_1_allKeys.length - 1].rt;
        resp_MLHC_1.duration = _resp_MLHC_1_allKeys[_resp_MLHC_1_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of MLHC_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function MLHC_1RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MLHC_1' ---
    for (const thisComponent of MLHC_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('MLHC_1.stopped', globalClock.getTime());
    if ((resp_MLHC_1.keys === '3')) {
        headphone_check_score = (headphone_check_score + 1);
    }
    
    sound_MLHC_1.stop();  // ensure sound has stopped at end of Routine
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp_MLHC_1.corr, level);
    }
    psychoJS.experiment.addData('resp_MLHC_1.keys', resp_MLHC_1.keys);
    if (typeof resp_MLHC_1.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp_MLHC_1.rt', resp_MLHC_1.rt);
        psychoJS.experiment.addData('resp_MLHC_1.duration', resp_MLHC_1.duration);
        routineTimer.reset();
        }
    
    resp_MLHC_1.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _resp_MLHC_2_allKeys;
var MLHC_2Components;
function MLHC_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MLHC_2' ---
    t = 0;
    MLHC_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(66.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('MLHC_2.started', globalClock.getTime());
    title_MLHC_2.setText('Trial 2');
    sound_MLHC_2.secs=5;
    sound_MLHC_2.setVolume(1.0);
    Q_MLHC_2.setText("Which tone was quietest?\n\nPlease press '1' on your keyboard for the first tone, '2' for the second tone, and '3' for the third tone.");
    resp_MLHC_2.keys = undefined;
    resp_MLHC_2.rt = undefined;
    _resp_MLHC_2_allKeys = [];
    // keep track of which components have finished
    MLHC_2Components = [];
    MLHC_2Components.push(title_MLHC_2);
    MLHC_2Components.push(sound_MLHC_2);
    MLHC_2Components.push(Q_MLHC_2);
    MLHC_2Components.push(resp_MLHC_2);
    
    for (const thisComponent of MLHC_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MLHC_2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MLHC_2' ---
    // get current time
    t = MLHC_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_MLHC_2* updates
    if (t >= 0 && title_MLHC_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_MLHC_2.tStart = t;  // (not accounting for frame time here)
      title_MLHC_2.frameNStart = frameN;  // exact frame index
      
      title_MLHC_2.setAutoDraw(true);
    }
    
    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_MLHC_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_MLHC_2.setAutoDraw(false);
    }
    // start/stop sound_MLHC_2
    if (t >= 1 && sound_MLHC_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound_MLHC_2.tStart = t;  // (not accounting for frame time here)
      sound_MLHC_2.frameNStart = frameN;  // exact frame index
      
      sound_MLHC_2.play();  // start the sound (it finishes automatically)
      sound_MLHC_2.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sound_MLHC_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= sound_MLHC_2.tStart + 0.5) {
        sound_MLHC_2.stop();  // stop the sound (if longer than duration)
        sound_MLHC_2.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *Q_MLHC_2* updates
    if (t >= 6 && Q_MLHC_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_MLHC_2.tStart = t;  // (not accounting for frame time here)
      Q_MLHC_2.frameNStart = frameN;  // exact frame index
      
      Q_MLHC_2.setAutoDraw(true);
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_MLHC_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_MLHC_2.setAutoDraw(false);
    }
    
    // *resp_MLHC_2* updates
    if (t >= 6 && resp_MLHC_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp_MLHC_2.tStart = t;  // (not accounting for frame time here)
      resp_MLHC_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp_MLHC_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_2.clearEvents(); });
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (resp_MLHC_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      resp_MLHC_2.status = PsychoJS.Status.FINISHED;
        }
      
    if (resp_MLHC_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp_MLHC_2.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _resp_MLHC_2_allKeys = _resp_MLHC_2_allKeys.concat(theseKeys);
      if (_resp_MLHC_2_allKeys.length > 0) {
        resp_MLHC_2.keys = _resp_MLHC_2_allKeys[_resp_MLHC_2_allKeys.length - 1].name;  // just the last key pressed
        resp_MLHC_2.rt = _resp_MLHC_2_allKeys[_resp_MLHC_2_allKeys.length - 1].rt;
        resp_MLHC_2.duration = _resp_MLHC_2_allKeys[_resp_MLHC_2_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of MLHC_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function MLHC_2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MLHC_2' ---
    for (const thisComponent of MLHC_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('MLHC_2.stopped', globalClock.getTime());
    if ((resp_MLHC_2.keys === '2')) {
        headphone_check_score = (headphone_check_score + 1);
    }
    
    sound_MLHC_2.stop();  // ensure sound has stopped at end of Routine
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp_MLHC_2.corr, level);
    }
    psychoJS.experiment.addData('resp_MLHC_2.keys', resp_MLHC_2.keys);
    if (typeof resp_MLHC_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp_MLHC_2.rt', resp_MLHC_2.rt);
        psychoJS.experiment.addData('resp_MLHC_2.duration', resp_MLHC_2.duration);
        routineTimer.reset();
        }
    
    resp_MLHC_2.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _resp_MLHC_3_allKeys;
var MLHC_3Components;
function MLHC_3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MLHC_3' ---
    t = 0;
    MLHC_3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(66.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('MLHC_3.started', globalClock.getTime());
    title_MLHC_3.setText('Trial 3');
    sound_MLHC_3.secs=5;
    sound_MLHC_3.setVolume(1.0);
    Q_MLHC_3.setText("Which tone was quietest?\n\nPlease press '1' on your keyboard for the first tone, '2' for the second tone, and '3' for the third tone.");
    resp_MLHC_3.keys = undefined;
    resp_MLHC_3.rt = undefined;
    _resp_MLHC_3_allKeys = [];
    // keep track of which components have finished
    MLHC_3Components = [];
    MLHC_3Components.push(title_MLHC_3);
    MLHC_3Components.push(sound_MLHC_3);
    MLHC_3Components.push(Q_MLHC_3);
    MLHC_3Components.push(resp_MLHC_3);
    
    for (const thisComponent of MLHC_3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MLHC_3RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MLHC_3' ---
    // get current time
    t = MLHC_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_MLHC_3* updates
    if (t >= 0 && title_MLHC_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_MLHC_3.tStart = t;  // (not accounting for frame time here)
      title_MLHC_3.frameNStart = frameN;  // exact frame index
      
      title_MLHC_3.setAutoDraw(true);
    }
    
    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_MLHC_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_MLHC_3.setAutoDraw(false);
    }
    // start/stop sound_MLHC_3
    if (t >= 1 && sound_MLHC_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound_MLHC_3.tStart = t;  // (not accounting for frame time here)
      sound_MLHC_3.frameNStart = frameN;  // exact frame index
      
      sound_MLHC_3.play();  // start the sound (it finishes automatically)
      sound_MLHC_3.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sound_MLHC_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= sound_MLHC_3.tStart + 0.5) {
        sound_MLHC_3.stop();  // stop the sound (if longer than duration)
        sound_MLHC_3.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *Q_MLHC_3* updates
    if (t >= 6 && Q_MLHC_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_MLHC_3.tStart = t;  // (not accounting for frame time here)
      Q_MLHC_3.frameNStart = frameN;  // exact frame index
      
      Q_MLHC_3.setAutoDraw(true);
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_MLHC_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_MLHC_3.setAutoDraw(false);
    }
    
    // *resp_MLHC_3* updates
    if (t >= 6 && resp_MLHC_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp_MLHC_3.tStart = t;  // (not accounting for frame time here)
      resp_MLHC_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp_MLHC_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_3.clearEvents(); });
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (resp_MLHC_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      resp_MLHC_3.status = PsychoJS.Status.FINISHED;
        }
      
    if (resp_MLHC_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp_MLHC_3.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _resp_MLHC_3_allKeys = _resp_MLHC_3_allKeys.concat(theseKeys);
      if (_resp_MLHC_3_allKeys.length > 0) {
        resp_MLHC_3.keys = _resp_MLHC_3_allKeys[_resp_MLHC_3_allKeys.length - 1].name;  // just the last key pressed
        resp_MLHC_3.rt = _resp_MLHC_3_allKeys[_resp_MLHC_3_allKeys.length - 1].rt;
        resp_MLHC_3.duration = _resp_MLHC_3_allKeys[_resp_MLHC_3_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of MLHC_3Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function MLHC_3RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MLHC_3' ---
    for (const thisComponent of MLHC_3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('MLHC_3.stopped', globalClock.getTime());
    if ((resp_MLHC_3.keys === '1')) {
        headphone_check_score = (headphone_check_score + 1);
    }
    
    sound_MLHC_3.stop();  // ensure sound has stopped at end of Routine
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp_MLHC_3.corr, level);
    }
    psychoJS.experiment.addData('resp_MLHC_3.keys', resp_MLHC_3.keys);
    if (typeof resp_MLHC_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp_MLHC_3.rt', resp_MLHC_3.rt);
        psychoJS.experiment.addData('resp_MLHC_3.duration', resp_MLHC_3.duration);
        routineTimer.reset();
        }
    
    resp_MLHC_3.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _resp_MLHC_4_allKeys;
var MLHC_4Components;
function MLHC_4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MLHC_4' ---
    t = 0;
    MLHC_4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(66.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('MLHC_4.started', globalClock.getTime());
    title_MLHC_4.setText('Trial 4');
    sound_MLHC_4.setValue('resources/antiphase_HC_SOI.wav');
    sound_MLHC_4.secs=5;
    sound_MLHC_4.setVolume(1.0);
    Q_MLHC_4.setText("Which tone was quietest?\n\nPlease press '1' on your keyboard for the first tone, '2' for the second tone, and '3' for the third tone.");
    resp_MLHC_4.keys = undefined;
    resp_MLHC_4.rt = undefined;
    _resp_MLHC_4_allKeys = [];
    // keep track of which components have finished
    MLHC_4Components = [];
    MLHC_4Components.push(title_MLHC_4);
    MLHC_4Components.push(sound_MLHC_4);
    MLHC_4Components.push(Q_MLHC_4);
    MLHC_4Components.push(resp_MLHC_4);
    
    for (const thisComponent of MLHC_4Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MLHC_4RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MLHC_4' ---
    // get current time
    t = MLHC_4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_MLHC_4* updates
    if (t >= 0 && title_MLHC_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_MLHC_4.tStart = t;  // (not accounting for frame time here)
      title_MLHC_4.frameNStart = frameN;  // exact frame index
      
      title_MLHC_4.setAutoDraw(true);
    }
    
    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_MLHC_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_MLHC_4.setAutoDraw(false);
    }
    // start/stop sound_MLHC_4
    if (t >= 1 && sound_MLHC_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound_MLHC_4.tStart = t;  // (not accounting for frame time here)
      sound_MLHC_4.frameNStart = frameN;  // exact frame index
      
      sound_MLHC_4.play();  // start the sound (it finishes automatically)
      sound_MLHC_4.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sound_MLHC_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= sound_MLHC_4.tStart + 0.5) {
        sound_MLHC_4.stop();  // stop the sound (if longer than duration)
        sound_MLHC_4.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *Q_MLHC_4* updates
    if (t >= 6 && Q_MLHC_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_MLHC_4.tStart = t;  // (not accounting for frame time here)
      Q_MLHC_4.frameNStart = frameN;  // exact frame index
      
      Q_MLHC_4.setAutoDraw(true);
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_MLHC_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_MLHC_4.setAutoDraw(false);
    }
    
    // *resp_MLHC_4* updates
    if (t >= 6 && resp_MLHC_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp_MLHC_4.tStart = t;  // (not accounting for frame time here)
      resp_MLHC_4.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp_MLHC_4.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_4.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_4.clearEvents(); });
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (resp_MLHC_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      resp_MLHC_4.status = PsychoJS.Status.FINISHED;
        }
      
    if (resp_MLHC_4.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp_MLHC_4.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _resp_MLHC_4_allKeys = _resp_MLHC_4_allKeys.concat(theseKeys);
      if (_resp_MLHC_4_allKeys.length > 0) {
        resp_MLHC_4.keys = _resp_MLHC_4_allKeys[_resp_MLHC_4_allKeys.length - 1].name;  // just the last key pressed
        resp_MLHC_4.rt = _resp_MLHC_4_allKeys[_resp_MLHC_4_allKeys.length - 1].rt;
        resp_MLHC_4.duration = _resp_MLHC_4_allKeys[_resp_MLHC_4_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of MLHC_4Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function MLHC_4RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MLHC_4' ---
    for (const thisComponent of MLHC_4Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('MLHC_4.stopped', globalClock.getTime());
    if ((resp_MLHC_4.keys === '1')) {
        headphone_check_score = (headphone_check_score + 1);
    }
    
    sound_MLHC_4.stop();  // ensure sound has stopped at end of Routine
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp_MLHC_4.corr, level);
    }
    psychoJS.experiment.addData('resp_MLHC_4.keys', resp_MLHC_4.keys);
    if (typeof resp_MLHC_4.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp_MLHC_4.rt', resp_MLHC_4.rt);
        psychoJS.experiment.addData('resp_MLHC_4.duration', resp_MLHC_4.duration);
        routineTimer.reset();
        }
    
    resp_MLHC_4.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _resp_MLHC_5_allKeys;
var MLHC_5Components;
function MLHC_5RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MLHC_5' ---
    t = 0;
    MLHC_5Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(66.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('MLHC_5.started', globalClock.getTime());
    title_MLHC_5.setText('Trial 5');
    sound_MLHC_5.secs=5;
    sound_MLHC_5.setVolume(1.0);
    Q_MLHC_5.setText("Which tone was quietest?\n\nPlease press '1' on your keyboard for the first tone, '2' for the second tone, and '3' for the third tone.");
    resp_MLHC_5.keys = undefined;
    resp_MLHC_5.rt = undefined;
    _resp_MLHC_5_allKeys = [];
    // keep track of which components have finished
    MLHC_5Components = [];
    MLHC_5Components.push(title_MLHC_5);
    MLHC_5Components.push(sound_MLHC_5);
    MLHC_5Components.push(Q_MLHC_5);
    MLHC_5Components.push(resp_MLHC_5);
    
    for (const thisComponent of MLHC_5Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MLHC_5RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MLHC_5' ---
    // get current time
    t = MLHC_5Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_MLHC_5* updates
    if (t >= 0 && title_MLHC_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_MLHC_5.tStart = t;  // (not accounting for frame time here)
      title_MLHC_5.frameNStart = frameN;  // exact frame index
      
      title_MLHC_5.setAutoDraw(true);
    }
    
    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_MLHC_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_MLHC_5.setAutoDraw(false);
    }
    // start/stop sound_MLHC_5
    if (t >= 1 && sound_MLHC_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound_MLHC_5.tStart = t;  // (not accounting for frame time here)
      sound_MLHC_5.frameNStart = frameN;  // exact frame index
      
      sound_MLHC_5.play();  // start the sound (it finishes automatically)
      sound_MLHC_5.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sound_MLHC_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= sound_MLHC_5.tStart + 0.5) {
        sound_MLHC_5.stop();  // stop the sound (if longer than duration)
        sound_MLHC_5.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *Q_MLHC_5* updates
    if (t >= 6 && Q_MLHC_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_MLHC_5.tStart = t;  // (not accounting for frame time here)
      Q_MLHC_5.frameNStart = frameN;  // exact frame index
      
      Q_MLHC_5.setAutoDraw(true);
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_MLHC_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_MLHC_5.setAutoDraw(false);
    }
    
    // *resp_MLHC_5* updates
    if (t >= 6 && resp_MLHC_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp_MLHC_5.tStart = t;  // (not accounting for frame time here)
      resp_MLHC_5.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp_MLHC_5.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_5.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_5.clearEvents(); });
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (resp_MLHC_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      resp_MLHC_5.status = PsychoJS.Status.FINISHED;
        }
      
    if (resp_MLHC_5.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp_MLHC_5.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _resp_MLHC_5_allKeys = _resp_MLHC_5_allKeys.concat(theseKeys);
      if (_resp_MLHC_5_allKeys.length > 0) {
        resp_MLHC_5.keys = _resp_MLHC_5_allKeys[_resp_MLHC_5_allKeys.length - 1].name;  // just the last key pressed
        resp_MLHC_5.rt = _resp_MLHC_5_allKeys[_resp_MLHC_5_allKeys.length - 1].rt;
        resp_MLHC_5.duration = _resp_MLHC_5_allKeys[_resp_MLHC_5_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of MLHC_5Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function MLHC_5RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MLHC_5' ---
    for (const thisComponent of MLHC_5Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('MLHC_5.stopped', globalClock.getTime());
    if ((resp_MLHC_5.keys === '3')) {
        headphone_check_score = (headphone_check_score + 1);
    }
    
    sound_MLHC_5.stop();  // ensure sound has stopped at end of Routine
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp_MLHC_5.corr, level);
    }
    psychoJS.experiment.addData('resp_MLHC_5.keys', resp_MLHC_5.keys);
    if (typeof resp_MLHC_5.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp_MLHC_5.rt', resp_MLHC_5.rt);
        psychoJS.experiment.addData('resp_MLHC_5.duration', resp_MLHC_5.duration);
        routineTimer.reset();
        }
    
    resp_MLHC_5.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _resp_MLHC_6_allKeys;
var MLHC_6Components;
function MLHC_6RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MLHC_6' ---
    t = 0;
    MLHC_6Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(66.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('MLHC_6.started', globalClock.getTime());
    title_MLHC_6.setText('Trial 6');
    sound_MLHC_6.setValue('resources/antiphase_HC_ISO.wav');
    sound_MLHC_6.secs=5;
    sound_MLHC_6.setVolume(1.0);
    Q_MLHC_6.setText("Which tone was quietest?\n\nPlease press '1' on your keyboard for the first tone, '2' for the second tone, and '3' for the third tone.");
    resp_MLHC_6.keys = undefined;
    resp_MLHC_6.rt = undefined;
    _resp_MLHC_6_allKeys = [];
    // keep track of which components have finished
    MLHC_6Components = [];
    MLHC_6Components.push(title_MLHC_6);
    MLHC_6Components.push(sound_MLHC_6);
    MLHC_6Components.push(Q_MLHC_6);
    MLHC_6Components.push(resp_MLHC_6);
    
    for (const thisComponent of MLHC_6Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MLHC_6RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MLHC_6' ---
    // get current time
    t = MLHC_6Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_MLHC_6* updates
    if (t >= 0 && title_MLHC_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_MLHC_6.tStart = t;  // (not accounting for frame time here)
      title_MLHC_6.frameNStart = frameN;  // exact frame index
      
      title_MLHC_6.setAutoDraw(true);
    }
    
    frameRemains = 0 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_MLHC_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_MLHC_6.setAutoDraw(false);
    }
    // start/stop sound_MLHC_6
    if (t >= 1 && sound_MLHC_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sound_MLHC_6.tStart = t;  // (not accounting for frame time here)
      sound_MLHC_6.frameNStart = frameN;  // exact frame index
      
      sound_MLHC_6.play();  // start the sound (it finishes automatically)
      sound_MLHC_6.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sound_MLHC_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= sound_MLHC_6.tStart + 0.5) {
        sound_MLHC_6.stop();  // stop the sound (if longer than duration)
        sound_MLHC_6.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *Q_MLHC_6* updates
    if (t >= 6 && Q_MLHC_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_MLHC_6.tStart = t;  // (not accounting for frame time here)
      Q_MLHC_6.frameNStart = frameN;  // exact frame index
      
      Q_MLHC_6.setAutoDraw(true);
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_MLHC_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_MLHC_6.setAutoDraw(false);
    }
    
    // *resp_MLHC_6* updates
    if (t >= 6 && resp_MLHC_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      resp_MLHC_6.tStart = t;  // (not accounting for frame time here)
      resp_MLHC_6.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { resp_MLHC_6.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_6.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { resp_MLHC_6.clearEvents(); });
    }
    
    frameRemains = 6 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (resp_MLHC_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      resp_MLHC_6.status = PsychoJS.Status.FINISHED;
        }
      
    if (resp_MLHC_6.status === PsychoJS.Status.STARTED) {
      let theseKeys = resp_MLHC_6.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _resp_MLHC_6_allKeys = _resp_MLHC_6_allKeys.concat(theseKeys);
      if (_resp_MLHC_6_allKeys.length > 0) {
        resp_MLHC_6.keys = _resp_MLHC_6_allKeys[_resp_MLHC_6_allKeys.length - 1].name;  // just the last key pressed
        resp_MLHC_6.rt = _resp_MLHC_6_allKeys[_resp_MLHC_6_allKeys.length - 1].rt;
        resp_MLHC_6.duration = _resp_MLHC_6_allKeys[_resp_MLHC_6_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of MLHC_6Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var headphone_check_fail;
function MLHC_6RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MLHC_6' ---
    for (const thisComponent of MLHC_6Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('MLHC_6.stopped', globalClock.getTime());
    if ((resp_MLHC_6.keys === '2')) {
        headphone_check_score = (headphone_check_score + 1);
    }
    
    headphone_check_fail = 0;
    
    if (headphone_check_score < 5) {
        headphone_check_fail = 1;
    }
    sound_MLHC_6.stop();  // ensure sound has stopped at end of Routine
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(resp_MLHC_6.corr, level);
    }
    psychoJS.experiment.addData('resp_MLHC_6.keys', resp_MLHC_6.keys);
    if (typeof resp_MLHC_6.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('resp_MLHC_6.rt', resp_MLHC_6.rt);
        psychoJS.experiment.addData('resp_MLHC_6.duration', resp_MLHC_6.duration);
        routineTimer.reset();
        }
    
    resp_MLHC_6.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var headphone_check_failed;
function headphone_check_failedLoopBegin(headphone_check_failedLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    headphone_check_failed = new TrialHandler({
      psychoJS: psychoJS,
      nReps: headphone_check_fail, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'headphone_check_failed'
    });
    psychoJS.experiment.addLoop(headphone_check_failed); // add the loop to the experiment
    currentLoop = headphone_check_failed;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisHeadphone_check_failed of headphone_check_failed) {
      snapshot = headphone_check_failed.getSnapshot();
      headphone_check_failedLoopScheduler.add(importConditions(snapshot));
      headphone_check_failedLoopScheduler.add(MLHC_failRoutineBegin(snapshot));
      headphone_check_failedLoopScheduler.add(MLHC_failRoutineEachFrame());
      headphone_check_failedLoopScheduler.add(MLHC_failRoutineEnd(snapshot));
      headphone_check_failedLoopScheduler.add(headphone_check_failedLoopEndIteration(headphone_check_failedLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function headphone_check_failedLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(headphone_check_failed);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function headphone_check_failedLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'resources/clips_cues_G3.xlsx',
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(clip_presentationRoutineBegin(snapshot));
      trialsLoopScheduler.add(clip_presentationRoutineEachFrame());
      trialsLoopScheduler.add(clip_presentationRoutineEnd(snapshot));
      const attnChecking3LoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(attnChecking3LoopBegin(attnChecking3LoopScheduler, snapshot));
      trialsLoopScheduler.add(attnChecking3LoopScheduler);
      trialsLoopScheduler.add(attnChecking3LoopEnd);
      trialsLoopScheduler.add(Q_thought_or_notRoutineBegin(snapshot));
      trialsLoopScheduler.add(Q_thought_or_notRoutineEachFrame());
      trialsLoopScheduler.add(Q_thought_or_notRoutineEnd(snapshot));
      trialsLoopScheduler.add(thought_descriptionRoutineBegin(snapshot));
      trialsLoopScheduler.add(thought_descriptionRoutineEachFrame());
      trialsLoopScheduler.add(thought_descriptionRoutineEnd(snapshot));
      trialsLoopScheduler.add(thought_ratingsRoutineBegin(snapshot));
      trialsLoopScheduler.add(thought_ratingsRoutineEachFrame());
      trialsLoopScheduler.add(thought_ratingsRoutineEnd(snapshot));
      trialsLoopScheduler.add(no_thoughtRoutineBegin(snapshot));
      trialsLoopScheduler.add(no_thoughtRoutineEachFrame());
      trialsLoopScheduler.add(no_thoughtRoutineEnd(snapshot));
      trialsLoopScheduler.add(general_ratingsRoutineBegin(snapshot));
      trialsLoopScheduler.add(general_ratingsRoutineEachFrame());
      trialsLoopScheduler.add(general_ratingsRoutineEnd(snapshot));
      const attnCheckingLoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(attnCheckingLoopBegin(attnCheckingLoopScheduler, snapshot));
      trialsLoopScheduler.add(attnCheckingLoopScheduler);
      trialsLoopScheduler.add(attnCheckingLoopEnd);
      const attnChecking2LoopScheduler = new Scheduler(psychoJS);
      trialsLoopScheduler.add(attnChecking2LoopBegin(attnChecking2LoopScheduler, snapshot));
      trialsLoopScheduler.add(attnChecking2LoopScheduler);
      trialsLoopScheduler.add(attnChecking2LoopEnd);
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var attnChecking3;
function attnChecking3LoopBegin(attnChecking3LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    attnChecking3 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: attnCheck3, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'attnChecking3'
    });
    psychoJS.experiment.addLoop(attnChecking3); // add the loop to the experiment
    currentLoop = attnChecking3;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisAttnChecking3 of attnChecking3) {
      snapshot = attnChecking3.getSnapshot();
      attnChecking3LoopScheduler.add(importConditions(snapshot));
      attnChecking3LoopScheduler.add(attn_vocalistQRoutineBegin(snapshot));
      attnChecking3LoopScheduler.add(attn_vocalistQRoutineEachFrame());
      attnChecking3LoopScheduler.add(attn_vocalistQRoutineEnd(snapshot));
      attnChecking3LoopScheduler.add(attnChecking3LoopEndIteration(attnChecking3LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function attnChecking3LoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(attnChecking3);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function attnChecking3LoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var attnChecking;
function attnCheckingLoopBegin(attnCheckingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    attnChecking = new TrialHandler({
      psychoJS: psychoJS,
      nReps: attnCheck, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'attnChecking'
    });
    psychoJS.experiment.addLoop(attnChecking); // add the loop to the experiment
    currentLoop = attnChecking;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisAttnChecking of attnChecking) {
      snapshot = attnChecking.getSnapshot();
      attnCheckingLoopScheduler.add(importConditions(snapshot));
      attnCheckingLoopScheduler.add(attn_bananaRoutineBegin(snapshot));
      attnCheckingLoopScheduler.add(attn_bananaRoutineEachFrame());
      attnCheckingLoopScheduler.add(attn_bananaRoutineEnd(snapshot));
      attnCheckingLoopScheduler.add(attnCheckingLoopEndIteration(attnCheckingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function attnCheckingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(attnChecking);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function attnCheckingLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var attnChecking2;
function attnChecking2LoopBegin(attnChecking2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    attnChecking2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: attnCheck2, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'attnChecking2'
    });
    psychoJS.experiment.addLoop(attnChecking2); // add the loop to the experiment
    currentLoop = attnChecking2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisAttnChecking2 of attnChecking2) {
      snapshot = attnChecking2.getSnapshot();
      attnChecking2LoopScheduler.add(importConditions(snapshot));
      attnChecking2LoopScheduler.add(attn_spacebarRoutineBegin(snapshot));
      attnChecking2LoopScheduler.add(attn_spacebarRoutineEachFrame());
      attnChecking2LoopScheduler.add(attn_spacebarRoutineEnd(snapshot));
      attnChecking2LoopScheduler.add(attnChecking2LoopEndIteration(attnChecking2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function attnChecking2LoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(attnChecking2);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function attnChecking2LoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var MLHC_failComponents;
function MLHC_failRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'MLHC_fail' ---
    t = 0;
    MLHC_failClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('MLHC_fail.started', globalClock.getTime());
    // keep track of which components have finished
    MLHC_failComponents = [];
    MLHC_failComponents.push(FAIL_headphonecheck_text);
    
    for (const thisComponent of MLHC_failComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function MLHC_failRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'MLHC_fail' ---
    // get current time
    t = MLHC_failClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *FAIL_headphonecheck_text* updates
    if (t >= 0.0 && FAIL_headphonecheck_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      FAIL_headphonecheck_text.tStart = t;  // (not accounting for frame time here)
      FAIL_headphonecheck_text.frameNStart = frameN;  // exact frame index
      
      FAIL_headphonecheck_text.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of MLHC_failComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function MLHC_failRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'MLHC_fail' ---
    for (const thisComponent of MLHC_failComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('MLHC_fail.stopped', globalClock.getTime());
    // the Routine "MLHC_fail" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var info_sheetComponents;
function info_sheetRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'info_sheet' ---
    t = 0;
    info_sheetClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(180.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('info_sheet.started', globalClock.getTime());
    // setup some python lists for storing info about the mouse_INFO
    mouse_INFO.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    info_sheetComponents = [];
    info_sheetComponents.push(title_INFO);
    info_sheetComponents.push(names_INFO);
    info_sheetComponents.push(text_INFO);
    info_sheetComponents.push(next_button_INFO);
    info_sheetComponents.push(mouse_INFO);
    
    for (const thisComponent of info_sheetComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function info_sheetRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'info_sheet' ---
    // get current time
    t = info_sheetClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_INFO* updates
    if (t >= 0.0 && title_INFO.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_INFO.tStart = t;  // (not accounting for frame time here)
      title_INFO.frameNStart = frameN;  // exact frame index
      
      title_INFO.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_INFO.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_INFO.setAutoDraw(false);
    }
    
    // *names_INFO* updates
    if (t >= 0.0 && names_INFO.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      names_INFO.tStart = t;  // (not accounting for frame time here)
      names_INFO.frameNStart = frameN;  // exact frame index
      
      names_INFO.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (names_INFO.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      names_INFO.setAutoDraw(false);
    }
    
    // *text_INFO* updates
    if (t >= 0.0 && text_INFO.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_INFO.tStart = t;  // (not accounting for frame time here)
      text_INFO.frameNStart = frameN;  // exact frame index
      
      text_INFO.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_INFO.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_INFO.setAutoDraw(false);
    }
    
    // *next_button_INFO* updates
    if (t >= 0.0 && next_button_INFO.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_INFO.tStart = t;  // (not accounting for frame time here)
      next_button_INFO.frameNStart = frameN;  // exact frame index
      
      next_button_INFO.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_button_INFO.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_button_INFO.setAutoDraw(false);
    }
    // *mouse_INFO* updates
    if (t >= 3.0 && mouse_INFO.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_INFO.tStart = t;  // (not accounting for frame time here)
      mouse_INFO.frameNStart = frameN;  // exact frame index
      
      mouse_INFO.status = PsychoJS.Status.STARTED;
      mouse_INFO.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 3.0 + 177 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_INFO.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_INFO.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_INFO.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_INFO.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_INFO]) {
            if (obj.contains(mouse_INFO)) {
              gotValidClick = true;
              mouse_INFO.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of info_sheetComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function info_sheetRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'info_sheet' ---
    for (const thisComponent of info_sheetComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('info_sheet.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var consentComponents;
function consentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'consent' ---
    t = 0;
    consentClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(180.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('consent.started', globalClock.getTime());
    // setup some python lists for storing info about the mouse_CONSENT
    mouse_CONSENT.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    consentComponents = [];
    consentComponents.push(title_CONSENT);
    consentComponents.push(text_CONSENTinstr);
    consentComponents.push(tex_CONSENTinstr2);
    consentComponents.push(text_CONSENTform);
    consentComponents.push(agree_button_CONSENT);
    consentComponents.push(mouse_CONSENT);
    
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function consentRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'consent' ---
    // get current time
    t = consentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_CONSENT* updates
    if (t >= 0.0 && title_CONSENT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_CONSENT.tStart = t;  // (not accounting for frame time here)
      title_CONSENT.frameNStart = frameN;  // exact frame index
      
      title_CONSENT.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_CONSENT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_CONSENT.setAutoDraw(false);
    }
    
    // *text_CONSENTinstr* updates
    if (t >= 0.0 && text_CONSENTinstr.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_CONSENTinstr.tStart = t;  // (not accounting for frame time here)
      text_CONSENTinstr.frameNStart = frameN;  // exact frame index
      
      text_CONSENTinstr.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_CONSENTinstr.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_CONSENTinstr.setAutoDraw(false);
    }
    
    // *tex_CONSENTinstr2* updates
    if (t >= 0.0 && tex_CONSENTinstr2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      tex_CONSENTinstr2.tStart = t;  // (not accounting for frame time here)
      tex_CONSENTinstr2.frameNStart = frameN;  // exact frame index
      
      tex_CONSENTinstr2.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (tex_CONSENTinstr2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      tex_CONSENTinstr2.setAutoDraw(false);
    }
    
    // *text_CONSENTform* updates
    if (t >= 0.0 && text_CONSENTform.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_CONSENTform.tStart = t;  // (not accounting for frame time here)
      text_CONSENTform.frameNStart = frameN;  // exact frame index
      
      text_CONSENTform.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_CONSENTform.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_CONSENTform.setAutoDraw(false);
    }
    
    // *agree_button_CONSENT* updates
    if (t >= 0.0 && agree_button_CONSENT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      agree_button_CONSENT.tStart = t;  // (not accounting for frame time here)
      agree_button_CONSENT.frameNStart = frameN;  // exact frame index
      
      agree_button_CONSENT.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (agree_button_CONSENT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      agree_button_CONSENT.setAutoDraw(false);
    }
    // *mouse_CONSENT* updates
    if (t >= 3.0 && mouse_CONSENT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_CONSENT.tStart = t;  // (not accounting for frame time here)
      mouse_CONSENT.frameNStart = frameN;  // exact frame index
      
      mouse_CONSENT.status = PsychoJS.Status.STARTED;
      mouse_CONSENT.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 3.0 + 177 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_CONSENT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_CONSENT.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_CONSENT.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_CONSENT.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [agree_button_CONSENT]) {
            if (obj.contains(mouse_CONSENT)) {
              gotValidClick = true;
              mouse_CONSENT.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of consentComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consentRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'consent' ---
    for (const thisComponent of consentComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('consent.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var AI_noticeComponents;
function AI_noticeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'AI_notice' ---
    t = 0;
    AI_noticeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('AI_notice.started', globalClock.getTime());
    // setup some python lists for storing info about the mouse_AI
    mouse_AI.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    AI_noticeComponents = [];
    AI_noticeComponents.push(text_AI_use_warning);
    AI_noticeComponents.push(no_AI_agree_button);
    AI_noticeComponents.push(mouse_AI);
    
    for (const thisComponent of AI_noticeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function AI_noticeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'AI_notice' ---
    // get current time
    t = AI_noticeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_AI_use_warning* updates
    if (t >= 0.0 && text_AI_use_warning.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_AI_use_warning.tStart = t;  // (not accounting for frame time here)
      text_AI_use_warning.frameNStart = frameN;  // exact frame index
      
      text_AI_use_warning.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_AI_use_warning.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_AI_use_warning.setAutoDraw(false);
    }
    
    // *no_AI_agree_button* updates
    if (t >= 0.0 && no_AI_agree_button.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      no_AI_agree_button.tStart = t;  // (not accounting for frame time here)
      no_AI_agree_button.frameNStart = frameN;  // exact frame index
      
      no_AI_agree_button.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (no_AI_agree_button.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      no_AI_agree_button.setAutoDraw(false);
    }
    // *mouse_AI* updates
    if (t >= 2 && mouse_AI.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_AI.tStart = t;  // (not accounting for frame time here)
      mouse_AI.frameNStart = frameN;  // exact frame index
      
      mouse_AI.status = PsychoJS.Status.STARTED;
      mouse_AI.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 2 + 58 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_AI.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_AI.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_AI.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_AI.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [no_AI_agree_button]) {
            if (obj.contains(mouse_AI)) {
              gotValidClick = true;
              mouse_AI.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of AI_noticeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function AI_noticeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'AI_notice' ---
    for (const thisComponent of AI_noticeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('AI_notice.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var instructionsComponents;
function instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(180.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('instructions.started', globalClock.getTime());
    // setup some python lists for storing info about the mouse_INSTR
    mouse_INSTR.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    instructionsComponents = [];
    instructionsComponents.push(title_INSTR);
    instructionsComponents.push(text_INSTR);
    instructionsComponents.push(next_button_INSTR);
    instructionsComponents.push(mouse_INSTR);
    
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_INSTR* updates
    if (t >= 0.0 && title_INSTR.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_INSTR.tStart = t;  // (not accounting for frame time here)
      title_INSTR.frameNStart = frameN;  // exact frame index
      
      title_INSTR.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_INSTR.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_INSTR.setAutoDraw(false);
    }
    
    // *text_INSTR* updates
    if (t >= 0.0 && text_INSTR.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_INSTR.tStart = t;  // (not accounting for frame time here)
      text_INSTR.frameNStart = frameN;  // exact frame index
      
      text_INSTR.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_INSTR.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_INSTR.setAutoDraw(false);
    }
    
    // *next_button_INSTR* updates
    if (t >= 0.0 && next_button_INSTR.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_INSTR.tStart = t;  // (not accounting for frame time here)
      next_button_INSTR.frameNStart = frameN;  // exact frame index
      
      next_button_INSTR.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_button_INSTR.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_button_INSTR.setAutoDraw(false);
    }
    // *mouse_INSTR* updates
    if (t >= 3.0 && mouse_INSTR.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_INSTR.tStart = t;  // (not accounting for frame time here)
      mouse_INSTR.frameNStart = frameN;  // exact frame index
      
      mouse_INSTR.status = PsychoJS.Status.STARTED;
      mouse_INSTR.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 3.0 + 177 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_INSTR.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_INSTR.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_INSTR.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_INSTR.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_INSTR]) {
            if (obj.contains(mouse_INSTR)) {
              gotValidClick = true;
              mouse_INSTR.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('instructions.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var clip_presentationComponents;
function clip_presentationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'clip_presentation' ---
    t = 0;
    clip_presentationClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(31.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('clip_presentation.started', globalClock.getTime());
    // Run 'Begin Routine' code from prog_attn
    
    progress_number = (progress_number + 1);
    attnCheck = 0;
    attnCheck2 = 0;
    attnCheck3 = 0;
    
    if ((progress_number === 4)) {
        attnCheck = 1;
    }
    if ((progress_number === 8)) {
        attnCheck2 = 1;
    }
    if ((progress_number === 12)) {
        attnCheck3 = 1;
    }
    clip_stimuli.setValue(clip_file_loc);
    clip_stimuli.secs=30.0;
    clip_stimuli.setVolume(0.7);
    cue_stimuli.setText(context_cue_text);
    progress_text.setText((("[Clip number " + progress_number.toString()) + " of 16]"));
    // keep track of which components have finished
    clip_presentationComponents = [];
    clip_presentationComponents.push(clip_stimuli);
    clip_presentationComponents.push(cue_stimuli);
    clip_presentationComponents.push(vol_icon);
    clip_presentationComponents.push(progress_text);
    
    for (const thisComponent of clip_presentationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function clip_presentationRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'clip_presentation' ---
    // get current time
    t = clip_presentationClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // start/stop clip_stimuli
    if (t >= 1 && clip_stimuli.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      clip_stimuli.tStart = t;  // (not accounting for frame time here)
      clip_stimuli.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ clip_stimuli.play(); });  // screen flip
      clip_stimuli.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 30.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (clip_stimuli.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= clip_stimuli.tStart + 0.5) {
        clip_stimuli.stop();  // stop the sound (if longer than duration)
        clip_stimuli.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *cue_stimuli* updates
    if (t >= 0.0 && cue_stimuli.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_stimuli.tStart = t;  // (not accounting for frame time here)
      cue_stimuli.frameNStart = frameN;  // exact frame index
      
      cue_stimuli.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 31 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cue_stimuli.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cue_stimuli.setAutoDraw(false);
    }
    
    // *vol_icon* updates
    if (t >= 1 && vol_icon.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vol_icon.tStart = t;  // (not accounting for frame time here)
      vol_icon.frameNStart = frameN;  // exact frame index
      
      vol_icon.setAutoDraw(true);
    }
    
    frameRemains = 1 + 30 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (vol_icon.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      vol_icon.setAutoDraw(false);
    }
    
    // *progress_text* updates
    if (t >= 0 && progress_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      progress_text.tStart = t;  // (not accounting for frame time here)
      progress_text.frameNStart = frameN;  // exact frame index
      
      progress_text.setAutoDraw(true);
    }
    
    frameRemains = 0 + 31 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (progress_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      progress_text.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of clip_presentationComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function clip_presentationRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'clip_presentation' ---
    for (const thisComponent of clip_presentationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('clip_presentation.stopped', globalClock.getTime());
    clip_stimuli.stop();  // ensure sound has stopped at end of Routine
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _response_vocalistATTN_allKeys;
var attn_vocalistQComponents;
function attn_vocalistQRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'attn_vocalistQ' ---
    t = 0;
    attn_vocalistQClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(20.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('attn_vocalistQ.started', globalClock.getTime());
    response_vocalistATTN.keys = undefined;
    response_vocalistATTN.rt = undefined;
    _response_vocalistATTN_allKeys = [];
    // keep track of which components have finished
    attn_vocalistQComponents = [];
    attn_vocalistQComponents.push(text_vocalistATTN);
    attn_vocalistQComponents.push(text_y_n);
    attn_vocalistQComponents.push(response_vocalistATTN);
    
    for (const thisComponent of attn_vocalistQComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function attn_vocalistQRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'attn_vocalistQ' ---
    // get current time
    t = attn_vocalistQClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_vocalistATTN* updates
    if (t >= 0 && text_vocalistATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_vocalistATTN.tStart = t;  // (not accounting for frame time here)
      text_vocalistATTN.frameNStart = frameN;  // exact frame index
      
      text_vocalistATTN.setAutoDraw(true);
    }
    
    frameRemains = 0 + 20 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_vocalistATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_vocalistATTN.setAutoDraw(false);
    }
    
    // *text_y_n* updates
    if (t >= 0 && text_y_n.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_y_n.tStart = t;  // (not accounting for frame time here)
      text_y_n.frameNStart = frameN;  // exact frame index
      
      text_y_n.setAutoDraw(true);
    }
    
    frameRemains = 0 + 20 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_y_n.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_y_n.setAutoDraw(false);
    }
    
    // *response_vocalistATTN* updates
    if (t >= 0.0 && response_vocalistATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      response_vocalistATTN.tStart = t;  // (not accounting for frame time here)
      response_vocalistATTN.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { response_vocalistATTN.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { response_vocalistATTN.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { response_vocalistATTN.clearEvents(); });
    }
    
    frameRemains = 0.0 + 20 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (response_vocalistATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      response_vocalistATTN.status = PsychoJS.Status.FINISHED;
        }
      
    if (response_vocalistATTN.status === PsychoJS.Status.STARTED) {
      let theseKeys = response_vocalistATTN.getKeys({keyList: ['y', 'n'], waitRelease: true});
      _response_vocalistATTN_allKeys = _response_vocalistATTN_allKeys.concat(theseKeys);
      if (_response_vocalistATTN_allKeys.length > 0) {
        response_vocalistATTN.keys = _response_vocalistATTN_allKeys[_response_vocalistATTN_allKeys.length - 1].name;  // just the last key pressed
        response_vocalistATTN.rt = _response_vocalistATTN_allKeys[_response_vocalistATTN_allKeys.length - 1].rt;
        response_vocalistATTN.duration = _response_vocalistATTN_allKeys[_response_vocalistATTN_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of attn_vocalistQComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function attn_vocalistQRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'attn_vocalistQ' ---
    for (const thisComponent of attn_vocalistQComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('attn_vocalistQ.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(response_vocalistATTN.corr, level);
    }
    psychoJS.experiment.addData('response_vocalistATTN.keys', response_vocalistATTN.keys);
    if (typeof response_vocalistATTN.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('response_vocalistATTN.rt', response_vocalistATTN.rt);
        psychoJS.experiment.addData('response_vocalistATTN.duration', response_vocalistATTN.duration);
        routineTimer.reset();
        }
    
    response_vocalistATTN.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _response_thought_or_not_allKeys;
var Q_thought_or_notComponents;
function Q_thought_or_notRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Q_thought_or_not' ---
    t = 0;
    Q_thought_or_notClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(180.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('Q_thought_or_not.started', globalClock.getTime());
    response_thought_or_not.keys = undefined;
    response_thought_or_not.rt = undefined;
    _response_thought_or_not_allKeys = [];
    // keep track of which components have finished
    Q_thought_or_notComponents = [];
    Q_thought_or_notComponents.push(text_thought_or_not);
    Q_thought_or_notComponents.push(response_thought_or_not);
    
    for (const thisComponent of Q_thought_or_notComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Q_thought_or_notRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Q_thought_or_not' ---
    // get current time
    t = Q_thought_or_notClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_thought_or_not* updates
    if (t >= 0 && text_thought_or_not.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_thought_or_not.tStart = t;  // (not accounting for frame time here)
      text_thought_or_not.frameNStart = frameN;  // exact frame index
      
      text_thought_or_not.setAutoDraw(true);
    }
    
    frameRemains = 0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_thought_or_not.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_thought_or_not.setAutoDraw(false);
    }
    
    // *response_thought_or_not* updates
    if (t >= 0.0 && response_thought_or_not.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      response_thought_or_not.tStart = t;  // (not accounting for frame time here)
      response_thought_or_not.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { response_thought_or_not.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { response_thought_or_not.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { response_thought_or_not.clearEvents(); });
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (response_thought_or_not.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      response_thought_or_not.status = PsychoJS.Status.FINISHED;
        }
      
    if (response_thought_or_not.status === PsychoJS.Status.STARTED) {
      let theseKeys = response_thought_or_not.getKeys({keyList: ['y', 'n'], waitRelease: true});
      _response_thought_or_not_allKeys = _response_thought_or_not_allKeys.concat(theseKeys);
      if (_response_thought_or_not_allKeys.length > 0) {
        response_thought_or_not.keys = _response_thought_or_not_allKeys[_response_thought_or_not_allKeys.length - 1].name;  // just the last key pressed
        response_thought_or_not.rt = _response_thought_or_not_allKeys[_response_thought_or_not_allKeys.length - 1].rt;
        response_thought_or_not.duration = _response_thought_or_not_allKeys[_response_thought_or_not_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Q_thought_or_notComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Q_thought_or_notRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Q_thought_or_not' ---
    for (const thisComponent of Q_thought_or_notComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('Q_thought_or_not.stopped', globalClock.getTime());
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(response_thought_or_not.corr, level);
    }
    psychoJS.experiment.addData('response_thought_or_not.keys', response_thought_or_not.keys);
    if (typeof response_thought_or_not.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('response_thought_or_not.rt', response_thought_or_not.rt);
        psychoJS.experiment.addData('response_thought_or_not.duration', response_thought_or_not.duration);
        routineTimer.reset();
        }
    
    response_thought_or_not.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var thought_descriptionComponents;
function thought_descriptionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'thought_description' ---
    t = 0;
    thought_descriptionClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('thought_description.started', globalClock.getTime());
    if (response_thought_or_not.keys === 'n') {
        continueRoutine = false;
    }
    
    descr_THOUGHT.setText('');
    descr_THOUGHT.refresh();
    descr_THOUGHT.setText('');
    next_button_THOUGHT.setText('Next>>>');
    // setup some python lists for storing info about the mouse_THOUGHT
    mouse_THOUGHT.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    thought_descriptionComponents = [];
    thought_descriptionComponents.push(instr_THOUGHT);
    thought_descriptionComponents.push(descr_THOUGHT);
    thought_descriptionComponents.push(next_button_THOUGHT);
    thought_descriptionComponents.push(mouse_THOUGHT);
    
    for (const thisComponent of thought_descriptionComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function thought_descriptionRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'thought_description' ---
    // get current time
    t = thought_descriptionClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instr_THOUGHT* updates
    if (t >= 0.0 && instr_THOUGHT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_THOUGHT.tStart = t;  // (not accounting for frame time here)
      instr_THOUGHT.frameNStart = frameN;  // exact frame index
      
      instr_THOUGHT.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr_THOUGHT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr_THOUGHT.setAutoDraw(false);
    }
    
    // *descr_THOUGHT* updates
    if (t >= 0 && descr_THOUGHT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      descr_THOUGHT.tStart = t;  // (not accounting for frame time here)
      descr_THOUGHT.frameNStart = frameN;  // exact frame index
      
      descr_THOUGHT.setAutoDraw(true);
    }
    
    frameRemains = 0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (descr_THOUGHT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      descr_THOUGHT.setAutoDraw(false);
    }
    
    // *next_button_THOUGHT* updates
    if (t >= 30 && next_button_THOUGHT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_THOUGHT.tStart = t;  // (not accounting for frame time here)
      next_button_THOUGHT.frameNStart = frameN;  // exact frame index
      
      next_button_THOUGHT.setAutoDraw(true);
    }
    
    frameRemains = 30 + 90 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_button_THOUGHT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_button_THOUGHT.setAutoDraw(false);
    }
    // *mouse_THOUGHT* updates
    if (t >= 30 && mouse_THOUGHT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_THOUGHT.tStart = t;  // (not accounting for frame time here)
      mouse_THOUGHT.frameNStart = frameN;  // exact frame index
      
      mouse_THOUGHT.status = PsychoJS.Status.STARTED;
      mouse_THOUGHT.mouseClock.reset();
      prevButtonState = mouse_THOUGHT.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 30 + 90 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_THOUGHT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_THOUGHT.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_THOUGHT.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_THOUGHT.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_THOUGHT]) {
            if (obj.contains(mouse_THOUGHT)) {
              gotValidClick = true;
              mouse_THOUGHT.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of thought_descriptionComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function thought_descriptionRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'thought_description' ---
    for (const thisComponent of thought_descriptionComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('thought_description.stopped', globalClock.getTime());
    psychoJS.experiment.addData('descr_THOUGHT.text',descr_THOUGHT.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var rating_1_finished;
var thought_ratingsComponents;
function thought_ratingsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'thought_ratings' ---
    t = 0;
    thought_ratingsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('thought_ratings.started', globalClock.getTime());
    if (response_thought_or_not.keys === 'n') {
        continueRoutine = false;
    }
    
    rating_1_finished = 0;
    rating_music_prompted.reset()
    rating_spontaneity.reset()
    rating_novelty.reset()
    next_button_TH_RATINGS.setText('Next>>>');
    // setup some python lists for storing info about the mouse_TH_RATINGS
    mouse_TH_RATINGS.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    thought_ratingsComponents = [];
    thought_ratingsComponents.push(Q_music_prompted);
    thought_ratingsComponents.push(rating_music_prompted);
    thought_ratingsComponents.push(Q_spontaneity);
    thought_ratingsComponents.push(rating_spontaneity);
    thought_ratingsComponents.push(Q_novelty);
    thought_ratingsComponents.push(rating_novelty);
    thought_ratingsComponents.push(next_button_TH_RATINGS);
    thought_ratingsComponents.push(mouse_TH_RATINGS);
    
    for (const thisComponent of thought_ratingsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function thought_ratingsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'thought_ratings' ---
    // get current time
    t = thought_ratingsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    if (rating_music_prompted.getRating() != undefined && rating_spontaneity.getRating() != undefined && rating_novelty.getRating() != undefined) {
        
            rating_1_finished = 1;
        }
    
    // *Q_music_prompted* updates
    if (t >= 0.0 && Q_music_prompted.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_music_prompted.tStart = t;  // (not accounting for frame time here)
      Q_music_prompted.frameNStart = frameN;  // exact frame index
      
      Q_music_prompted.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_music_prompted.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_music_prompted.setAutoDraw(false);
    }
    
    // *rating_music_prompted* updates
    if (t >= 0.0 && rating_music_prompted.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rating_music_prompted.tStart = t;  // (not accounting for frame time here)
      rating_music_prompted.frameNStart = frameN;  // exact frame index
      
      rating_music_prompted.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rating_music_prompted.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rating_music_prompted.setAutoDraw(false);
    }
    
    // *Q_spontaneity* updates
    if (t >= 0.0 && Q_spontaneity.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_spontaneity.tStart = t;  // (not accounting for frame time here)
      Q_spontaneity.frameNStart = frameN;  // exact frame index
      
      Q_spontaneity.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_spontaneity.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_spontaneity.setAutoDraw(false);
    }
    
    // *rating_spontaneity* updates
    if (t >= 0.0 && rating_spontaneity.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rating_spontaneity.tStart = t;  // (not accounting for frame time here)
      rating_spontaneity.frameNStart = frameN;  // exact frame index
      
      rating_spontaneity.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rating_spontaneity.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rating_spontaneity.setAutoDraw(false);
    }
    
    // *Q_novelty* updates
    if (t >= 0.0 && Q_novelty.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_novelty.tStart = t;  // (not accounting for frame time here)
      Q_novelty.frameNStart = frameN;  // exact frame index
      
      Q_novelty.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_novelty.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_novelty.setAutoDraw(false);
    }
    
    // *rating_novelty* updates
    if (t >= 0.0 && rating_novelty.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rating_novelty.tStart = t;  // (not accounting for frame time here)
      rating_novelty.frameNStart = frameN;  // exact frame index
      
      rating_novelty.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rating_novelty.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rating_novelty.setAutoDraw(false);
    }
    
    // *next_button_TH_RATINGS* updates
    if (((rating_1_finished == 1)) && next_button_TH_RATINGS.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_TH_RATINGS.tStart = t;  // (not accounting for frame time here)
      next_button_TH_RATINGS.frameNStart = frameN;  // exact frame index
      
      next_button_TH_RATINGS.setAutoDraw(true);
    }
    
    // *mouse_TH_RATINGS* updates
    if (((rating_1_finished == 1)) && mouse_TH_RATINGS.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_TH_RATINGS.tStart = t;  // (not accounting for frame time here)
      mouse_TH_RATINGS.frameNStart = frameN;  // exact frame index
      
      mouse_TH_RATINGS.status = PsychoJS.Status.STARTED;
      mouse_TH_RATINGS.mouseClock.reset();
      prevButtonState = mouse_TH_RATINGS.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_TH_RATINGS.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_TH_RATINGS.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_TH_RATINGS]) {
            if (obj.contains(mouse_TH_RATINGS)) {
              gotValidClick = true;
              mouse_TH_RATINGS.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of thought_ratingsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function thought_ratingsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'thought_ratings' ---
    for (const thisComponent of thought_ratingsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('thought_ratings.stopped', globalClock.getTime());
    psychoJS.experiment.addData('rating_music_prompted.response', rating_music_prompted.getRating());
    psychoJS.experiment.addData('rating_music_prompted.rt', rating_music_prompted.getRT());
    psychoJS.experiment.addData('rating_spontaneity.response', rating_spontaneity.getRating());
    psychoJS.experiment.addData('rating_spontaneity.rt', rating_spontaneity.getRT());
    psychoJS.experiment.addData('rating_novelty.response', rating_novelty.getRating());
    psychoJS.experiment.addData('rating_novelty.rt', rating_novelty.getRT());
    // store data for psychoJS.experiment (ExperimentHandler)
    // the Routine "thought_ratings" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var no_thoughtComponents;
function no_thoughtRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'no_thought' ---
    t = 0;
    no_thoughtClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(120.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('no_thought.started', globalClock.getTime());
    if (response_thought_or_not.keys === 'y') {
        continueRoutine = false;
    }
    
    input_NOT.setText('');
    input_NOT.refresh();
    input_NOT.setText('');
    next_button_NOT.setText('Next>>>');
    // setup some python lists for storing info about the mouse_NOT
    mouse_NOT.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    no_thoughtComponents = [];
    no_thoughtComponents.push(instr_NOT);
    no_thoughtComponents.push(input_NOT);
    no_thoughtComponents.push(next_button_NOT);
    no_thoughtComponents.push(mouse_NOT);
    
    for (const thisComponent of no_thoughtComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function no_thoughtRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'no_thought' ---
    // get current time
    t = no_thoughtClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instr_NOT* updates
    if (t >= 0.0 && instr_NOT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instr_NOT.tStart = t;  // (not accounting for frame time here)
      instr_NOT.frameNStart = frameN;  // exact frame index
      
      instr_NOT.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (instr_NOT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      instr_NOT.setAutoDraw(false);
    }
    
    // *input_NOT* updates
    if (t >= 0 && input_NOT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      input_NOT.tStart = t;  // (not accounting for frame time here)
      input_NOT.frameNStart = frameN;  // exact frame index
      
      input_NOT.setAutoDraw(true);
    }
    
    frameRemains = 0 + 120 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (input_NOT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      input_NOT.setAutoDraw(false);
    }
    
    // *next_button_NOT* updates
    if (t >= 30 && next_button_NOT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_NOT.tStart = t;  // (not accounting for frame time here)
      next_button_NOT.frameNStart = frameN;  // exact frame index
      
      next_button_NOT.setAutoDraw(true);
    }
    
    frameRemains = 30 + 90 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_button_NOT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_button_NOT.setAutoDraw(false);
    }
    // *mouse_NOT* updates
    if (t >= 30 && mouse_NOT.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_NOT.tStart = t;  // (not accounting for frame time here)
      mouse_NOT.frameNStart = frameN;  // exact frame index
      
      mouse_NOT.status = PsychoJS.Status.STARTED;
      mouse_NOT.mouseClock.reset();
      prevButtonState = mouse_NOT.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 30 + 90 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_NOT.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_NOT.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_NOT.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_NOT.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_NOT]) {
            if (obj.contains(mouse_NOT)) {
              gotValidClick = true;
              mouse_NOT.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of no_thoughtComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function no_thoughtRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'no_thought' ---
    for (const thisComponent of no_thoughtComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('no_thought.stopped', globalClock.getTime());
    psychoJS.experiment.addData('input_NOT.text',input_NOT.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var rating_2_finished;
var general_ratingsComponents;
function general_ratingsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'general_ratings' ---
    t = 0;
    general_ratingsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('general_ratings.started', globalClock.getTime());
    rating_2_finished = 0;
    rating_familiarity.reset()
    rating_enjoyment.reset()
    next_button_G_RATINGS.setText('Next>>>');
    // setup some python lists for storing info about the mouse_G_RATINGS
    mouse_G_RATINGS.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    general_ratingsComponents = [];
    general_ratingsComponents.push(Q_familiarity);
    general_ratingsComponents.push(rating_familiarity);
    general_ratingsComponents.push(Q_enjoyment);
    general_ratingsComponents.push(rating_enjoyment);
    general_ratingsComponents.push(next_button_G_RATINGS);
    general_ratingsComponents.push(mouse_G_RATINGS);
    
    for (const thisComponent of general_ratingsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function general_ratingsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'general_ratings' ---
    // get current time
    t = general_ratingsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    if (rating_familiarity.getRating() != undefined && rating_enjoyment.getRating() != undefined) {
        
            rating_2_finished = 1;
        }
    
    // *Q_familiarity* updates
    if (t >= 0.0 && Q_familiarity.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_familiarity.tStart = t;  // (not accounting for frame time here)
      Q_familiarity.frameNStart = frameN;  // exact frame index
      
      Q_familiarity.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_familiarity.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_familiarity.setAutoDraw(false);
    }
    
    // *rating_familiarity* updates
    if (t >= 0.0 && rating_familiarity.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rating_familiarity.tStart = t;  // (not accounting for frame time here)
      rating_familiarity.frameNStart = frameN;  // exact frame index
      
      rating_familiarity.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rating_familiarity.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rating_familiarity.setAutoDraw(false);
    }
    
    // *Q_enjoyment* updates
    if (t >= 0.0 && Q_enjoyment.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Q_enjoyment.tStart = t;  // (not accounting for frame time here)
      Q_enjoyment.frameNStart = frameN;  // exact frame index
      
      Q_enjoyment.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Q_enjoyment.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Q_enjoyment.setAutoDraw(false);
    }
    
    // *rating_enjoyment* updates
    if (t >= 0.0 && rating_enjoyment.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rating_enjoyment.tStart = t;  // (not accounting for frame time here)
      rating_enjoyment.frameNStart = frameN;  // exact frame index
      
      rating_enjoyment.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rating_enjoyment.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rating_enjoyment.setAutoDraw(false);
    }
    
    // *next_button_G_RATINGS* updates
    if (((rating_2_finished == 1)) && next_button_G_RATINGS.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_G_RATINGS.tStart = t;  // (not accounting for frame time here)
      next_button_G_RATINGS.frameNStart = frameN;  // exact frame index
      
      next_button_G_RATINGS.setAutoDraw(true);
    }
    
    // *mouse_G_RATINGS* updates
    if (((rating_2_finished == 1)) && mouse_G_RATINGS.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_G_RATINGS.tStart = t;  // (not accounting for frame time here)
      mouse_G_RATINGS.frameNStart = frameN;  // exact frame index
      
      mouse_G_RATINGS.status = PsychoJS.Status.STARTED;
      mouse_G_RATINGS.mouseClock.reset();
      prevButtonState = mouse_G_RATINGS.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_G_RATINGS.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_G_RATINGS.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_G_RATINGS]) {
            if (obj.contains(mouse_G_RATINGS)) {
              gotValidClick = true;
              mouse_G_RATINGS.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of general_ratingsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function general_ratingsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'general_ratings' ---
    for (const thisComponent of general_ratingsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('general_ratings.stopped', globalClock.getTime());
    psychoJS.experiment.addData('rating_familiarity.response', rating_familiarity.getRating());
    psychoJS.experiment.addData('rating_familiarity.rt', rating_familiarity.getRT());
    psychoJS.experiment.addData('rating_enjoyment.response', rating_enjoyment.getRating());
    psychoJS.experiment.addData('rating_enjoyment.rt', rating_enjoyment.getRT());
    // store data for psychoJS.experiment (ExperimentHandler)
    // the Routine "general_ratings" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var attn_bananaComponents;
function attn_bananaRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'attn_banana' ---
    t = 0;
    attn_bananaClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(20.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('attn_banana.started', globalClock.getTime());
    foil_banana.setValue('resources/foil_banana.mp3');
    foil_banana.secs=19.7;
    foil_banana.setVolume(1.0);
    textbox_ATTN.setText('');
    textbox_ATTN.refresh();
    // setup some python lists for storing info about the mouse_ATTN
    mouse_ATTN.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    attn_bananaComponents = [];
    attn_bananaComponents.push(foil_banana);
    attn_bananaComponents.push(textbox_ATTN);
    attn_bananaComponents.push(next_button_ATTN);
    attn_bananaComponents.push(mouse_ATTN);
    
    for (const thisComponent of attn_bananaComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function attn_bananaRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'attn_banana' ---
    // get current time
    t = attn_bananaClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // start/stop foil_banana
    if (t >= 0.3 && foil_banana.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      foil_banana.tStart = t;  // (not accounting for frame time here)
      foil_banana.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ foil_banana.play(); });  // screen flip
      foil_banana.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 0.3 + 19.7 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (foil_banana.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= foil_banana.tStart + 0.5) {
        foil_banana.stop();  // stop the sound (if longer than duration)
        foil_banana.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *textbox_ATTN* updates
    if (t >= 0.3 && textbox_ATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox_ATTN.tStart = t;  // (not accounting for frame time here)
      textbox_ATTN.frameNStart = frameN;  // exact frame index
      
      textbox_ATTN.setAutoDraw(true);
    }
    
    frameRemains = 0.3 + 19.7 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (textbox_ATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      textbox_ATTN.setAutoDraw(false);
    }
    
    // *next_button_ATTN* updates
    if (t >= 5.0 && next_button_ATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_button_ATTN.tStart = t;  // (not accounting for frame time here)
      next_button_ATTN.frameNStart = frameN;  // exact frame index
      
      next_button_ATTN.setAutoDraw(true);
    }
    
    frameRemains = 5.0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_button_ATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_button_ATTN.setAutoDraw(false);
    }
    // *mouse_ATTN* updates
    if (t >= 5.0 && mouse_ATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_ATTN.tStart = t;  // (not accounting for frame time here)
      mouse_ATTN.frameNStart = frameN;  // exact frame index
      
      mouse_ATTN.status = PsychoJS.Status.STARTED;
      mouse_ATTN.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 5.0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_ATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_ATTN.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_ATTN.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_ATTN.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [next_button_ATTN]) {
            if (obj.contains(mouse_ATTN)) {
              gotValidClick = true;
              mouse_ATTN.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of attn_bananaComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function attn_bananaRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'attn_banana' ---
    for (const thisComponent of attn_bananaComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('attn_banana.stopped', globalClock.getTime());
    foil_banana.stop();  // ensure sound has stopped at end of Routine
    psychoJS.experiment.addData('textbox_ATTN.text',textbox_ATTN.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _spacebar_ATTN_allKeys;
var attn_spacebarComponents;
function attn_spacebarRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'attn_spacebar' ---
    t = 0;
    attn_spacebarClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(20.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('attn_spacebar.started', globalClock.getTime());
    foil_spacebar.secs=6;
    foil_spacebar.setVolume(0.7);
    spacebar_ATTN.keys = undefined;
    spacebar_ATTN.rt = undefined;
    _spacebar_ATTN_allKeys = [];
    // keep track of which components have finished
    attn_spacebarComponents = [];
    attn_spacebarComponents.push(foil_spacebar);
    attn_spacebarComponents.push(cue_stimuli_ATTN);
    attn_spacebarComponents.push(vol_icon_ATTN);
    attn_spacebarComponents.push(progress_text_ATTN);
    attn_spacebarComponents.push(spacebar_ATTN);
    
    for (const thisComponent of attn_spacebarComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function attn_spacebarRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'attn_spacebar' ---
    // get current time
    t = attn_spacebarClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // start/stop foil_spacebar
    if (t >= 1 && foil_spacebar.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      foil_spacebar.tStart = t;  // (not accounting for frame time here)
      foil_spacebar.frameNStart = frameN;  // exact frame index
      
      psychoJS.window.callOnFlip(function(){ foil_spacebar.play(); });  // screen flip
      foil_spacebar.status = PsychoJS.Status.STARTED;
    }
    frameRemains = 1 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (foil_spacebar.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      if (t >= foil_spacebar.tStart + 0.5) {
        foil_spacebar.stop();  // stop the sound (if longer than duration)
        foil_spacebar.status = PsychoJS.Status.FINISHED;
      }
    }
    
    // *cue_stimuli_ATTN* updates
    if (t >= 0.0 && cue_stimuli_ATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_stimuli_ATTN.tStart = t;  // (not accounting for frame time here)
      cue_stimuli_ATTN.frameNStart = frameN;  // exact frame index
      
      cue_stimuli_ATTN.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 20 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cue_stimuli_ATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cue_stimuli_ATTN.setAutoDraw(false);
    }
    
    // *vol_icon_ATTN* updates
    if (t >= 1 && vol_icon_ATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      vol_icon_ATTN.tStart = t;  // (not accounting for frame time here)
      vol_icon_ATTN.frameNStart = frameN;  // exact frame index
      
      vol_icon_ATTN.setAutoDraw(true);
    }
    
    frameRemains = 1 + 19 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (vol_icon_ATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      vol_icon_ATTN.setAutoDraw(false);
    }
    
    // *progress_text_ATTN* updates
    if (t >= 0 && progress_text_ATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      progress_text_ATTN.tStart = t;  // (not accounting for frame time here)
      progress_text_ATTN.frameNStart = frameN;  // exact frame index
      
      progress_text_ATTN.setAutoDraw(true);
    }
    
    frameRemains = 0 + 20 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (progress_text_ATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      progress_text_ATTN.setAutoDraw(false);
    }
    
    // *spacebar_ATTN* updates
    if (t >= 1 && spacebar_ATTN.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      spacebar_ATTN.tStart = t;  // (not accounting for frame time here)
      spacebar_ATTN.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { spacebar_ATTN.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { spacebar_ATTN.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { spacebar_ATTN.clearEvents(); });
    }
    
    frameRemains = 1 + 19 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (spacebar_ATTN.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      spacebar_ATTN.status = PsychoJS.Status.FINISHED;
        }
      
    if (spacebar_ATTN.status === PsychoJS.Status.STARTED) {
      let theseKeys = spacebar_ATTN.getKeys({keyList: ['space'], waitRelease: false});
      _spacebar_ATTN_allKeys = _spacebar_ATTN_allKeys.concat(theseKeys);
      if (_spacebar_ATTN_allKeys.length > 0) {
        spacebar_ATTN.keys = _spacebar_ATTN_allKeys[_spacebar_ATTN_allKeys.length - 1].name;  // just the last key pressed
        spacebar_ATTN.rt = _spacebar_ATTN_allKeys[_spacebar_ATTN_allKeys.length - 1].rt;
        spacebar_ATTN.duration = _spacebar_ATTN_allKeys[_spacebar_ATTN_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of attn_spacebarComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function attn_spacebarRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'attn_spacebar' ---
    for (const thisComponent of attn_spacebarComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('attn_spacebar.stopped', globalClock.getTime());
    foil_spacebar.stop();  // ensure sound has stopped at end of Routine
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(spacebar_ATTN.corr, level);
    }
    psychoJS.experiment.addData('spacebar_ATTN.keys', spacebar_ATTN.keys);
    if (typeof spacebar_ATTN.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('spacebar_ATTN.rt', spacebar_ATTN.rt);
        psychoJS.experiment.addData('spacebar_ATTN.duration', spacebar_ATTN.duration);
        routineTimer.reset();
        }
    
    spacebar_ATTN.stop();
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var demographics;
var demographicsClock;
function demographicsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'demographics' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    //--- Starting Routine 'demographics' ---
    demographics = new visual.Survey({
        win: psychoJS.window,
        name: 'demographics',
        model: 'resources/survey_demographics.json',
    });
    demographicsClock = new util.Clock();
    demographics.setAutoDraw(true);
    demographics.status = PsychoJS.Status.STARTED;
    demographics.isFinished = false;
    demographics.tStart = t;  // (not accounting for frame time here)
    demographics.frameNStart = frameN;  // exact frame index
    return Scheduler.Event.NEXT;
  }
}


function demographicsRoutineEachFrame() {
  return async function () {
    t = demographicsClock.getTime();
    frameN = frameN + 1;  // number of completed frames (so 0 is the first frame)
    // if demographics is completed, move on
    if (demographics.isFinished) {
      demographics.setAutoDraw(false);
      demographics.status = PsychoJS.Status.FINISHED;
      // survey routines are not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      return Scheduler.Event.NEXT;
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    return Scheduler.Event.FLIP_REPEAT;
  }
}


function demographicsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'demographics' ---
    // get data from demographics
    const demographicsResponse =  demographics.getResponse();
    function addRecursively(resp, name) {
        if (resp.constructor === Object) {
            // if resp is an object, add each part as a column
            for (let subquestion in resp) {
                addRecursively(resp[subquestion], `${name}.${subquestion}`);
            }
        } else {
            psychoJS.experiment.addData(name, resp);
        }
    }
    // recursively add survey responses
    addRecursively(demographicsResponse, 'demographics');
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var debriefComponents;
function debriefRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'debrief' ---
    t = 0;
    debriefClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(180.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('debrief.started', globalClock.getTime());
    // setup some python lists for storing info about the mouse_DEBRIEF
    mouse_DEBRIEF.clicked_name = [];
    gotValidClick = false; // until a click is received
    // keep track of which components have finished
    debriefComponents = [];
    debriefComponents.push(title_DEBRIEF);
    debriefComponents.push(text_DEBRIEF);
    debriefComponents.push(end_button);
    debriefComponents.push(mouse_DEBRIEF);
    
    for (const thisComponent of debriefComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function debriefRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'debrief' ---
    // get current time
    t = debriefClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *title_DEBRIEF* updates
    if (t >= 0.0 && title_DEBRIEF.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      title_DEBRIEF.tStart = t;  // (not accounting for frame time here)
      title_DEBRIEF.frameNStart = frameN;  // exact frame index
      
      title_DEBRIEF.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (title_DEBRIEF.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      title_DEBRIEF.setAutoDraw(false);
    }
    
    // *text_DEBRIEF* updates
    if (t >= 0.0 && text_DEBRIEF.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_DEBRIEF.tStart = t;  // (not accounting for frame time here)
      text_DEBRIEF.frameNStart = frameN;  // exact frame index
      
      text_DEBRIEF.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_DEBRIEF.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_DEBRIEF.setAutoDraw(false);
    }
    
    // *end_button* updates
    if (t >= 0.0 && end_button.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      end_button.tStart = t;  // (not accounting for frame time here)
      end_button.frameNStart = frameN;  // exact frame index
      
      end_button.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 180 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (end_button.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      end_button.setAutoDraw(false);
    }
    // *mouse_DEBRIEF* updates
    if (t >= 3.0 && mouse_DEBRIEF.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_DEBRIEF.tStart = t;  // (not accounting for frame time here)
      mouse_DEBRIEF.frameNStart = frameN;  // exact frame index
      
      mouse_DEBRIEF.status = PsychoJS.Status.STARTED;
      mouse_DEBRIEF.mouseClock.reset();
      prevButtonState = [0, 0, 0];  // if now button is down we will treat as 'new' click
      }
    frameRemains = 3.0 + 177 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (mouse_DEBRIEF.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      mouse_DEBRIEF.status = PsychoJS.Status.FINISHED;
        }
    if (mouse_DEBRIEF.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_DEBRIEF.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [end_button]) {
            if (obj.contains(mouse_DEBRIEF)) {
              gotValidClick = true;
              mouse_DEBRIEF.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // end routine on response
            continueRoutine = false;
          }
        }
      }
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of debriefComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function debriefRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'debrief' ---
    for (const thisComponent of debriefComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('debrief.stopped', globalClock.getTime());
    // store data for psychoJS.experiment (ExperimentHandler)
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
