import { BulletPoint, Collapsible } from '@src/presentation/components/collapsible'
import { observer } from 'mobx-react-lite'

export const HelpModal = observer(() => {
  return (
    <div className="w-[50dvw] mobile:w-[400px] bg-primary-dark rounded-lg p-3 space-y-2 mobile:max-h-[80dvh] mobile:overflow-y-auto">
      <p className="text-lg font-bold text-white">Quick Guide</p>
      <Collapsible label="Terms and Descriptions">
        <p>Acronyms used in this calculator:</p>
        <BulletPoint>
          <b className="text-desc">A~</b> - Ascension Level.
        </BulletPoint>
        <BulletPoint>
          <b className="text-desc">S~</b> - Sequence Node (Resonator Dupes).
        </BulletPoint>
        <BulletPoint>
          <b className="text-desc">R~</b> - Refinement Rank (Weapon Dupes).
        </BulletPoint>
        <BulletPoint>
          <b className="text-desc">I~</b> - Inherent Skills; <b>I1</b> and <b>I2</b> refer to the Inherent Skill
          unlocked at Ascension 2 and 4, respectively.
        </BulletPoint>
      </Collapsible>
      <Collapsible label="Team Setup">
        <p>This page contains 3 main sections:</p>
        <p>
          1. <b className="text-desc">Resonator</b>: allows you to select your resonator for the slot, as well as
          specifying their level, ascension, sequence nodes, and forte levels.
        </p>
        <BulletPoint>
          To change your resonator, click the box below <span className="text-desc">Name</span>. This will bring up a
          modal for resonator selection. Inputs for resonator's level, ascension and sequence nodes are right below, and
          will be disabled until a character is chosen.
        </BulletPoint>
        <BulletPoint>Once a resonator is chosen, you may additionally change their forte levels.</BulletPoint>
        <BulletPoint>
          Resonator's stats are also displayed below. These values does not take any conditional effects and Inherent
          Skills into account. To view the character's final stats after conditionals, please head to the{' '}
          <b className="text-red">Damage Calculator</b> page.
        </BulletPoint>
        <BulletPoint>
          You can save builds for each resonator and assign one of them as your default build. Once set, every time you
          select the resonator, the app will automatically equips them with the weapon and artifacts from the default
          build.
        </BulletPoint>
        <p className="pt-1">
          2. <b className="text-desc">Weapon</b>: allows you to select your resonator's weapon.
        </p>
        <BulletPoint>
          You can hover the <i className="fa-regular fa-question-circle indent-0" /> icon for the weapon's syntonize at
          the chosen refinement.
        </BulletPoint>
        <p className="pt-1">
          3. <b className="text-desc">Echoes</b>: allows you to customize your resonator's echoes.
        </p>
        <BulletPoint>
          Adding a new echo will create it in your <b className="text-red">Data Bank</b> while equipping an echo will
          instead allow you to choose any existing ones from there.
        </BulletPoint>
        <BulletPoint>
          Once equipped, hover over the echo card for options to edit, swap, unequip or delete it.
        </BulletPoint>
        <BulletPoint>
          The Sonata bonus for equipped echoes and their total cost can be found at the bottom. Hover their name to
          display the effects.
        </BulletPoint>
        <BulletPoint>
          You may save a set of echoes as build using the button on the bottom right of the page. You can also
          fast-equip saved builds from there as well.
        </BulletPoint>
      </Collapsible>
      <Collapsible label="Damage Calculator">
        <p>You can see the damage each resonator deals here. Hover over each number for a formula breakdown.</p>
        <BulletPoint>
          The calculator calculates the stats for every character in the team at once. Effects that are dependent on a
          character's stats (e.g. Shorekeeper's <b>Stellarealm</b>) will automatically use the calculated amount. You
          only have to toggle it.
        </BulletPoint>
        <BulletPoint>
          Character's stats displayed here are the final value that includes all the applicable buffs.
        </BulletPoint>
        <BulletPoint>
          Target enemy's level and DMG RES can be set in <span className="text-desc">Enemy Setting</span> menu.
        </BulletPoint>
        <BulletPoint>Team-wide modifiers will be synced across all resonators in the team.</BulletPoint>
        <BulletPoint>
          For some resonators that have a secondary ability set (e.g. Jinhsi, Xiangli Yao, or Lumi), a toggle to switch
          their abilities will be shown. These toggles will sync their value across setups when comparing builds.
        </BulletPoint>
      </Collapsible>
      <Collapsible label="Account Data">
        <BulletPoint>
          Your account data is saved in <span className="text-desc">My Resonators</span>,{' '}
          <span className="text-desc">My Builds</span> and <span className="text-desc">Data Bank</span>. You can check
          and modify them in each respective section.
        </BulletPoint>
        <BulletPoint>
          You may manually input your data or alternatively import it from either an{' '}
          <span className="text-desc">Exported JSON File</span>.
        </BulletPoint>
        <BulletPoint>
          Changes made in <span className="text-desc">Team Setup</span> Page will not affect your account data.
        </BulletPoint>
        <BulletPoint>
          Your data on this app is <span className="text-red">temporary</span> and will be lost once you close or
          refresh the app. You may toggle on the{' '}
          <span className="text-desc">Automatically save my account data to the browser's local storage</span> option in
          the <span className="text-desc">Settings</span>.
        </BulletPoint>
      </Collapsible>
    </div>
  )
})
