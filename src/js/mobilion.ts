import {ConvertService} from './convert-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

const convertService = new ConvertService();
const input = document.getElementById('calculator-input');
const result = document.getElementById('calculator-result');

input.focus();

Observable.fromEvent(input, 'keyup')
    .debounceTime(300)
    .map((event: any) => event.target.value)
    .filter(value => value.match(/\d+\.?\d*/))
    .map(value => parseFloat(value))
    .switchMap(value => convertService.convertToMobilion(value))
    .map(converted => converted.mobilionValue * 1000)
    .map(mobilion => Math.round(mobilion) / 1000)
    .map(mobilion => mobilion.toString())
    .subscribe(mobilion => result.innerText = mobilion);