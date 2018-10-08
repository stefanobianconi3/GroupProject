import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider} from "../../assets/bpmn-js/bpmn-js";
import {CustomPropsProvider} from '../../assets/props-provider/CustomPropsProvider';
import {CustomPaletteProvider} from "../../assets/props-provider/CustomPaletteProvider";
import { DataService } from 'src/app/services/data.service';


const customModdle = {
  name: "customModdle",
  uri: "http://example.com/custom-moddle",
  prefix: "custom",
  xml: {
    tagAlias: "lowerCase"
  },
  associations: [],
  types: [
    {
      "name": "ExtUserTask",
      "extends": [
        "bpmn:UserTask"
      ],
      "properties": [
        {
          "name": "worklist",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
  ]
};

@Component({
  selector: 'app-modeler',
  templateUrl: './modeler.component.html',
  styleUrls: ['./modeler.component.scss']
})
export class ModelerComponent implements OnInit {
  private path;
  private version;
  private newVersion;
  private overwrite = false;
  private modeler;
  private bpmnXML;
  private alerts = false; 
  private success = true;
  private previous = false;
  private previousMessage = "a previous version";
  private currentMessage = "the existing version";
  private nome = localStorage.getItem('nome');
  private folderPath = "";

  constructor(private http: HttpClient, private parameters: ActivatedRoute, private data: DataService) { 
    
  }

  ngOnInit() {
    this.getParameters();
    this.folderPath = this.getFolderPath();
    this.data.getModel(this.path, this.version).subscribe(
      (payload) => {
        if(payload['success']){
          this.bpmnXML = payload['data'];
          this.modeler = new Modeler({
            container: '#canvas',
            width: '100%',
            height: '600px',
            additionalModules: [
              PropertiesPanelModule,
      
              // Re-use original bpmn-properties-module, see CustomPropsProvider
              {[InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]]},
              {[InjectionNames.propertiesProvider]: ['type', CustomPropsProvider]},
      
              // Re-use original palette, see CustomPaletteProvider
              {[InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider]},
              {[InjectionNames.paletteProvider]: ['type', CustomPaletteProvider]},
            ],
            propertiesPanel: {
              parent: '#properties'
            },
            moddleExtension: {
              custom: customModdle
            }
          });
      
          this.modeler.importXML(this.bpmnXML, function(err) {
            if(err){
              console.log(err)
            }
          });
        }
      }
    );
  }

  private changeSlash(path) {
    let newPath = "";
    for (let i = 0; i < path.length; i++) {
      if (path[i] == "\\") {
        newPath = newPath + "%5C";
      } else {
        newPath = newPath + path[i];
      }
    }
    return newPath;
  }

  getParameters(){
    this.parameters.paramMap.subscribe(
      (params) => {
        this.path = params.get("path");
        if(params.get("version")){
          this.version = params.get("version");
        } else {
          this.version = 0;
        }
      }
  );
  }

  getFolderPath(){
    let array = this.path.split("\\");
    let array2 = array.pop();
    return array.join("\\");
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  checkOverwrite(version){
    this.newVersion = version;
    if(this.newVersion == this.version){
      this.overwrite = true;
      this.previous = false;
    } else if (this.newVersion < this.version){
      this.overwrite = true;
      this.previous = true;
    }
    else {
      this.overwrite = false;
      this.save(version);
    }
  }

  save(version): void {
    this.overwrite = false;
    this.modeler.saveXML(
      (err: any, xml: any) => {
        console.log(xml);
        if(err){
          console.log(err);
        } else {
          this.data.saveModel(this.path, version, xml).subscribe(
            (payload) => {
              if(payload['success']){
                this.alerts = true;
                this.success = true;
              } else {
                this.alerts = true;
                this.success = false;
              }
            }
          )
        }
      });
  }

  newModelReq(model){
    /*
    console.log(model);
    this.data.createModel(this.folderPath + "\\" + model).subscribe(
      (payload) => {
        if(payload['success']){
          let path = this.changeSlash(this.folderPath);
          window.open("/modeler/" + path + "%5C" + model, '_blank');
        } else {
          alert("There was a problem");
        }
      }
    );
    */
  }
}
