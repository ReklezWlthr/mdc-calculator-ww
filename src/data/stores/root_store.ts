import { Build, BuildStoreType } from './build_store'
import { CalculatorStore, CalculatorStoreType } from './calculator_store'
import { CharacterStore, CharacterStoreType } from './character_store'
import { EnergyStore, EnergyStoreType } from './energy_store'
import { ImportStore } from './import_store'
import { InventoryStoreType, Inventory } from './inventory_store'
import { Modal, ModalStoreType } from './modal_store'
import { SettingStore } from './setting_store'
import { SetupStore, SetupStoreType } from './setup_store'
import { Team, TeamStoreType } from './team_store'
import { Toast, ToastStoreType } from './toast_store'
// import { User, UserType } from './user_store'

interface RootStoreType {
  modalStore: ModalStoreType
  teamStore: TeamStoreType
  artifactStore: InventoryStoreType
  buildStore: BuildStoreType
  charStore: CharacterStoreType
  calculatorStore: CalculatorStoreType
  settingStore: SettingStore
  importStore: ImportStore
  toastStore: ToastStoreType
  setupStore: SetupStoreType
  energyStore: EnergyStoreType
  // userStore: UserType
}

export class RootStore {
  modalStore: ModalStoreType
  teamStore: TeamStoreType
  artifactStore: InventoryStoreType
  buildStore: BuildStoreType
  charStore: CharacterStoreType
  calculatorStore: CalculatorStore
  settingStore: SettingStore
  importStore: ImportStore
  toastStore: ToastStoreType
  setupStore: SetupStoreType
  energyStore: EnergyStoreType
  // userStore: UserType

  constructor() {
    this.modalStore = new Modal()
    this.teamStore = new Team()
    this.artifactStore = new Inventory()
    this.buildStore = new Build()
    this.charStore = new CharacterStore()
    this.calculatorStore = new CalculatorStore()
    this.settingStore = new SettingStore()
    this.importStore = new ImportStore()
    this.toastStore = new Toast()
    this.setupStore = new SetupStore()
    this.energyStore = new EnergyStore()
    // this.userStore = new User()
  }

  hydrate(data: RootStoreType) {
    if (!data) return
    this.modalStore.hydrate(data.modalStore)
    this.teamStore.hydrate(data.teamStore)
    this.artifactStore.hydrate(data.artifactStore)
    this.buildStore.hydrate(data.buildStore)
    this.charStore.hydrate(data.charStore)
    this.calculatorStore.hydrate(data.calculatorStore)
    this.settingStore.hydrate(data.settingStore)
    this.importStore.hydrate(data.importStore)
    this.toastStore.hydrate(data.toastStore)
    this.setupStore.hydrate(data.setupStore)
    this.energyStore.hydrate(data.energyStore)
    // this.userStore.hydrate(data.userStore)
  }
}
