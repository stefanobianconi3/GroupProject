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

  constructor(private http: HttpClient, private parameters: ActivatedRoute, private data: DataService) { 
    
  }

  ngOnInit() {
    this.getParameters();
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

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  checkOverwrite(version){
    this.newVersion = version;
    if(this.newVersion == this.version){
      this.overwrite = true;
    } else {
      this.save(version);
    }
  }

  save(version): void {
    this.overwrite = false;
    this.modeler.saveXML(
      (err: any, xml: any) => {
        if(err){
          console.log(err);
        } else {
          this.data.saveModel(this.path, version, xml).subscribe(
            (payload) => {
              if(payload['success']){
                console.log(payload['data']);
              }
            }
          )
        }
      });
  }
}

