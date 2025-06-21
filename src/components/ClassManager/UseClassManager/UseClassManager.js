//Import logic js files
import { useClassState } from './UseClassState.js'
import { useClassStorage } from './UseClassStorage.js'
import { useClassActions } from './UseClassActions.js'

export function useClassManager() {
  const state = useClassState()
  useClassStorage(state.classes)
  const actions = useClassActions(state)
  return { ...state, ...actions }
}
