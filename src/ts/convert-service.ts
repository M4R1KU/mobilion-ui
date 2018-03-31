import {ConvertDto} from './convert-dto';
import request from 'superagent';
import {Observable} from 'rxjs/Observable';

export class ConvertService {
    private readonly apiUrl = 'https://api.mobilion.cash/convert';

    public convertToMobilion(normalValue: number): Observable<ConvertDto> {
        return Observable.create(observer =>
            request.get(this.apiUrl)
                .query({value: normalValue})
                .end((err: request.ResponseError, res: request.Response) => {
                    if (err) {
                        observer.error(err);
                    } else {
                        observer.next(res.body);
                    }
                    observer.complete();
                })
        )
    }
}