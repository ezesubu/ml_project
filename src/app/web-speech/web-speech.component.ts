import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognizerService } from './shared/services/speech-recognizer.service';

import { SpeechNotification } from './shared/model/speech-notification';
import { SpeechError } from './shared/model/speech-error';
import { ActionContext } from './shared/model/strategy/action-context';
import { WorldService } from './shared/services/world.service';

@Component({
  selector: 'wsa-web-speech',
  templateUrl: './web-speech.component.html',
  styleUrls: ['./web-speech.component.css']
})
export class WebSpeechComponent implements OnInit {

  finalTranscript = '';
  recognizing = false;
  notification: string;
  currentLanguage: string;
  actionContext: ActionContext = new ActionContext();
  assert = false;
  world;

  constructor(private changeDetector: ChangeDetectorRef,
              private speechRecognizer: SpeechRecognizerService,
              private WorldService: WorldService) { }

  ngOnInit() {
    this.currentLanguage = 'es-ES';
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
    this.world = this.WorldService.getItem();
    
  }

  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }

    this.speechRecognizer.start(event.timeStamp);
  }


  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          if(message == this.world.name){
            this.assert = true;
            alert("Congratulations... you did!!")
            this.world = this.WorldService.getItem();
            
          }else{
             alert("you said "+ message +" \n try again!" )
          }
          this.actionContext.processMessage(message, this.currentLanguage);
          this.detectChanges();
          this.actionContext.runAction(message, this.currentLanguage);
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the game.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }
}
