import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,

} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
    new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

/* the difference between implements and extends is that implements is
 used to implement an interface, while extends is used to extend a class.*/
export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: any) { }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                //data = > user entity
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        );

    }
}