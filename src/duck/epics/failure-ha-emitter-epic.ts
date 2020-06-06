/**
 *   Wechaty Open Source Software - https://github.com/wechaty
 *
 *   @copyright 2016 Huan LI (李卓桓) <https://github.com/huan>, and
 *                   Wechaty Contributors <https://github.com/wechaty>.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import {
  isActionOf,
}                 from 'typesafe-actions'
import {
  filter,
  map,
}                   from 'rxjs/operators'

import { Epic }     from 'redux-observable'

import * as actions     from '../actions'

import { getBundle } from '../ducks'

/**
 * In:  actions.failureWechaty
 * Out: actions.failureHA
 */
const failureHaEmitterEpic: Epic = (action$, _state$) => action$.pipe(
  filter(isActionOf(actions.failureWechaty)),
  filter(action => !getBundle().selectors.isWechatyAvailable(action.payload.wechatyId)),
  map(action => actions.failureHA(
    getBundle().selectors.getHaByWechaty(
      action.payload.wechatyId
    ),
  )),
)

export {
  failureHaEmitterEpic,
}
