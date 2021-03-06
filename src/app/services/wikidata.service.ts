import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizRTTemplate, Questions, Options } from '../generator/generator.model';

@Injectable({
  providedIn: 'root'
})
export class WikidataService {    

  constructor( private httpcaller : HttpClient ) {
  }

  getSearchObject(subject : string) {
    return this.httpcaller.get('https://www.wikidata.org/w/api.php?origin=*&action=wbsearchentities&search='+subject+'&language=en&format=json')
  }

  getSearchEntity(entityId : string) {
    return this.httpcaller.get('https://www.wikidata.org/w/api.php?origin=*&action=wbgetentities&ids='+entityId+'&languages=en&format=json')
  }

  postEntityObject(entityObject : QuizRTTemplate) {
    return this.httpcaller.post('http://localhost:5000/api/quizrt',entityObject)
    // return this.httpcaller.post('http://172.23.238.164:8080/api/quizrt',entityObject)
  }

  generateEntityQuesOption(sparQL : string) {
    return this.httpcaller.get('https://query.wikidata.org/sparql?query='+sparQL+'&format=json')
  }
  
  // ----------------

  getSearchEntityNew(entityId : string) {
    return this.httpcaller.get("https://query.wikidata.org/sparql?query=PREFIX entity: <http://www.wikidata.org/entity/> SELECT ?propUrl ?propLabel ?valUrl ?valLabel ?picture WHERE { hint:Query hint:optimizer 'None' . {    BIND(entity:"+entityId+" AS ?valUrl) . BIND('N/A' AS ?propUrl ) . BIND('identity'@en AS ?propLabel ) . } UNION {    entity:"+entityId+" ?propUrl ?valUrl . ?property ?ref ?propUrl . ?property rdf:type wikibase:Property . ?property rdfs:label ?propLabel } ?valUrl rdfs:label ?valLabel FILTER (LANG(?valLabel) = 'en') . OPTIONAL{ ?valUrl wdt:P18 ?picture .} FILTER (lang(?propLabel) = 'en' ) } ORDER BY ?propUrl ?valUrl LIMIT 200&format=json")
  }

}
