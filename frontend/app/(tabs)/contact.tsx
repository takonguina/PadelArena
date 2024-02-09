import { View as DefaultView } from 'react-native';
import CallUs from '../components/contact/callUs';
import MailUs from '../components/contact/mailUs';
import SocialMedia from '../components/contact/socialMedia'

const contact = () => {
  return (
    <DefaultView>
      <CallUs/>
      <MailUs/>
      <SocialMedia/>
    </DefaultView>
  )
}

export default contact