import { ProfileCard } from './ProfileCard'
const meta = { component: ProfileCard, tags: ['autodocs'], argTypes: { enableTilt: { control: 'toggle' }, showUserInfo: { control: 'toggle' }, behindGlowEnabled: { control: 'toggle' } } }
export default meta
export const Default = { args: { avatarUrl: 'https://i.pravatar.cc/400?img=8', enableTilt: true, name: 'Alex Rivera', title: 'Software Engineer', handle: 'alexrivera', status: 'Online', showUserInfo: true } }
export const NoTilt = { args: { avatarUrl: 'https://i.pravatar.cc/400?img=11', enableTilt: false, name: 'Jordan Chen', title: 'Designer', handle: 'jordan', showUserInfo: true } }
export const Minimal = { args: { avatarUrl: 'https://i.pravatar.cc/400?img=3', enableTilt: true, showUserInfo: false, name: 'Sam', title: 'Developer', handle: 'sam' } }
