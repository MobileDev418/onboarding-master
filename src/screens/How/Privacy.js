import React,{Component} from 'react';
import {Container, Header, Content, Footer, FooterTab, Button,Input, Icon, Body, Right, Left,Title, Card, Badge, CardItem} from 'native-base';
import {View,Dimensions,Image,TouchableOpacity,FlatList,TextInput,Text, Platform, AsyncStorage, ActivityIndicator , ScrollView} from 'react-native';
import styles from './style'
export default class MyProfile extends Component{
    static navigatorStyle={
        navBarHidden:true
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={()=>this.props.navigator.pop({animationType:"slide-horizontal"})} style={{position:'absolute',left: 18}}>
                                    <Image source={require('@images/component/cancel.png')} style={{width:15,height:15}} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.privacyTitle}>Privacy Policy</Text>
                                <Text style={styles.privacyText}>

                                    
                                    <Text style={{fontWeight:'bold'}}>Effective Date: May 25, 2018</Text>{'\n'}{'\n'}

                                    This Privacy Policy is incorporated by this
                                    reference into the End User Terms and 
                                    conditions That is available on our app . 
                                    The terms “Company,” “we,” and “us”
                                    include Lolos, an exempted company duly 
                                    incorporated with limited liability and validly
                                    existing under the Laws of the state of Israel 
                                    Lolos , and its affiliates and/or subsidiaries.
                                    All other terms not defined in this Privacy Policy
                                    will have the meanings set forth in the terms and
                                    conditions. This Privacy Policy explains how the{'\n'}
                                    Company may:{'\n'}

                                    - collect{'\n'}

                                    - use, and{'\n'}

                                    - disclose{'\n'}

                                    information we obtain through the Service. As used in this Privacy Policy, “Personal Information”
                                    means information that alone or when in combination with other information may be used to readily
                                    identify, contact, or locate you, such as your name, address, email address, or phone number. We
                                    do not consider Personal Information to include information that has been aggregated and/or de-
                                    identified so that it does not allow a third party to easily identify a specific individual.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d', fontWeight:'bold'}}>THE SERVICE COLLECTS YOUR INFORMATION</Text>{'\n'}{'\n'}

                                    We collect information, including Personal Information, when you:{'\n'}
                                    • register to use the Service;{'\n'}
                                    • log in with social networking credentials;{'\n'}
                                    • submit information to us when you use the Service;{'\n'}
                                    • and communicate with us.{'\n'}
                                    We also collect information, such as anonymous usage statistics, by using cookies, server logs, and
                                    other similar technology as you use the Service.
                                    Personal Information Collection. You may browse the public-facing portions of the Service without
                                    registering an Account with the Company. If you register an Account with us to use the Service, then
                                    you must provide us with certain Personal Information, such as your phone number, or you may be
                                    able to register using your User credentials to certain social media sites, such as Twitter or
                                    Facebook.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Social Sign-On</Text>{'\n'}{'\n'}
                                    We may collect Personal Information from a social media website when you use
                                    your social media credentials to log into the Service. For example, when you log in with your Twitter
                                    or Facebook credentials, we may collect the Personal Information you have made publicly available
                                    on those websites, such as your User name and profile picture. We may also obtain other non-public
                                    information with your permission.
                                    Using the Service We collect information that you Post to the Service. For example, when you Post
                                    comments, a short biography, UGVs or Broadcast Content on the Service, we will collect the
                                    information you include in these submissions, including any Personal Information.
                                    Messages. We collect and process information you provide, including any Personal Information, in
                                    the context of composing, sending, or receiving messages through our Service’s messaging
                                    functionality, and we may collect information about your use of our messaging functionality. Please be aware that messages sent to other Users of our Service will be accessible by those other Users and that we are not responsible for the manner in which those Users use or disclose messages.
                                    Location Information. We collect information about your location if you grant us permission to do so. If you change your mind and do not want us to collect your location information, then you can
                                    choose to hide your location through the settings available with the Apps.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Customer Support</Text>{'\n'}{'\n'}
                                    We collect all information that you provide to us, including any Personal
                                    Information, when you contact us for customer-support purposes.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Cookies, Automatic Data Collection, and Related Technologies </Text>{'\n'}{'\n'}
                                    The Service collects and stores information that is generated automatically as you use it, including your preferences and anonymous usage statistics.
                                    When you visit the Service, we and our third-party service providers receive and record information
                                    on our server logs from your browser, including your IP address, and from cookies and similar
                                    technology. Cookies are small text files containing a string of alphanumeric characters. We may use
                                    both session cookies and persistent cookies. A session cookie disappears after you close your
                                    browser. A persistent cookie remains after you close your browser and may be used by your
                                    browser on subsequent visits to the Service. Please review your web browser “Help” file to learn the
                                    proper way to modify your cookie settings. Please note that if you delete, or choose not to accept,
                                    cookies from the Service, you may not be able to utilize the features of the Service to their fullest
                                    potential. We may use third party cookies on our Service as well. For instance, we may use Google
                                    Analytics to collect and process certain analytics data. Google provides some additional privacy
                                    options described at{'\n'} <Text style={{color:"#66cfff",textDecorationLine:'underline',textDecorationColor:'#66cfff'}} >www.google.com/policies/privacy/partners/</Text> regarding Google Analytics cookies.
                                    By using the Service, you are authorizing us to gather, parse, and retain data related to the provision
                                    of the Service.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>HOW THE COMPANY USES YOUR INFORMATION</Text>{'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'300',fontSize:13}}>We use Personal Information to:</Text>{'\n'}
                                    -facilitate and improve our Service;{'\n'}
                                    -and communicate with you.{'\n'}
                                    We may use de-identified and aggregated information for any lawful purpose, including for marketing
                                    purposes.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Internal and Service-Related Usage</Text>{'\n'}{'\n'}

                                    We use information, including Personal Information, for internal and Service-related purposes and may provide it to third parties to allow us to provide and improve the Service. For example, we may scan any sound recordings in the local library on your mobile device to identify such content, and we may use that information to restrict certain uses of the content, to pay copyright owners of such content, or to develop or provide other functionalities on the Service.{'\n'}
                                        {'\n'}


                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Communications</Text>{'\n'}{'\n'}

                                    We may send email to the email address you provide to us (a) for customer
                                    service related purposes, (b) to provide you with updates or information relating to the Service,
                                    including promotions and other opportunities, or (c) for enforcement of the EULA or this Privacy
                                    Policy.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Aggregate Data</Text>{'\n'}{'\n'}
                                    We may de-identify and aggregate information collected through the Service and use it for any lawful purpose.{'\n'}{'\n'}

                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>THE COMPANY MAY DISCLOSE YOUR INFORMATION</Text>{'\n'}{'\n'}
                                    We may share your information:{'\n'}
                                    -with our third-party service providers;{'\n'}
                                    -to comply with legal obligations;{'\n'}
                                    -to protect and defend our rights and property and the rights, property and safety of our Users;{'\n'}
                                    -and with your permission.{'\n'}
                                    We do not rent, sell, or share Personal Information about you with other people or nonaffiliated
                                    companies for their direct marketing purposes, unless we have your permission.

                                    We Use Vendors and Service Providers
                                    We may share any information we receive with vendors and service providers retained in connection with the provision of the Service.
                                                {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Social Networking and Other Websites</Text>{'\n'}{'\n'}

                                    The Service may allow you to share information, including Personal Information, with social networking websites, such as Twitter, Facebook and Instagram.
                                    We do not share your Personal Information with these social networking sites unless you direct the
                                    Service to share your Personal Information. The use of your Personal Information by any social
                                    networking websites will be governed by their privacy policies, and you may be able to modify your privacy settings on their websites.

                                     {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>User Content and Information</Text>{'\n'}{'\n'}

                                    User Content you Post to the Service, such as UGVs, comments, Broadcast Content and your short biography, will be displayed on the Service and viewable by other users. In addition, your profile information, such as any photograph of you and your User name, will also be searchable and accessible by other Users. We are not responsible for the privacy practices of the other Users who will view and use this information, so you should carefully consider whether to Post any User Content on the Service or how you identify yourself on the Service. You should not disclose your home address or the address of your place of business, school or other locations you frequent on a regular basis in any User Content.
                                    Marketing. We do not rent, sell, or share Personal Information about you with other people or
                                    nonaffiliated companies for their direct marketing purposes, unless we have your permission. The
                                    Service may allow you to opt-in to receive communications from third parties, including the record
                                    labels who own the rights to any sound recordings you use on the Service. If you give us your
                                    permission to share your Personal Information with such third parties, then you may receive
                                    communications from such third parties and you are solely responsible for your engagement with
                                    such third parties.


                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Location Information</Text>{'\n'}{'\n'}

                                    We may share your approximate location, but not your exact location, with other Users.
                                    As Required By Law and Similar Disclosures.
                                    We may access, preserve, and disclose your Personal Information or other account information if we believe doing so is required or appropriate to
                                    (a) comply with law enforcement requests and legal process, such as a court order or subpoena; (b) respond to your requests; or (c) protect your, our or others’ rights, property, or safety. For the
                                    avoidance of doubt, disclosure of Personal Information may occur if you Post any Objectionable Content on or through the Service.

                                   {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}> Merger, Sale, or Other Asset Transfers</Text>{'\n'}{'\n'}

                                    If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy or liquidation where the business will not continue as a going concern, receivership, sale of the Company’s assets, or transition of the Service to another provider, your information may be sold or transferred as part of such a transaction as permitted by law and/or contract. The use of your Personal Information following any of these events will be governed by the provisions of this Privacy Policy in effect at the time the applicable Personal Information was collected.

                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}> Consent</Text>{'\n'}{'\n'}
                                    We may also disclose your Personal Information with your permission.



                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}> SECURITY OF YOUR INFORMATION</Text>{'\n'}{'\n'}

                                    We take steps to ensure that your information is treated securely and in accordance with this Privacy Policy. Unfortunately, the Internet cannot be guaranteed to be 100% secure, and we cannot ensure or warrant the security of any information you provide to us. We do not accept liability for unintentional access, use or disclosure.

                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}> CHILDREN’S PRIVACY</Text>{'\n'}{'\n'}

                                    We do not knowingly collect information from children under 13 and we do not want it. We will take steps to delete it if we learn we have collected it.
                                    We do not knowingly collect, maintain, or use Personal Information from children under 13 years of age, and no part of the Service is directed to children under the age of 13. If you learn that your child has provided us with Personal Information without your consent, then you may alert us at
                                    {'\n'}<Text style={{color:"#66cfff",textDecorationLine:'underline',textDecorationColor:'#66cfff'}} >Getyourlolos@gmail.com.</Text> {'\n'}
                                    If we learn that we have collected any Personal Information from children under 13, then we will promptly take steps to delete such information and terminate the child’s account.
                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>INTERNATIONAL USERS</Text>{'\n'}{'\n'}
                                    By using the Service, you will transfer data to the Israel.
                                    By choosing to visit the Service or otherwise provide information to us, you agree that any dispute over privacy or the terms contained in this Privacy Policy will be governed by the laws of the State of Israel and the adjudication of any disputes arising in connection with the Company or the
                                    Service will be in accordance with the terms and conditions that are available in our app.
                                    If you are visiting the Service from the European Union or the USA or other regions with laws governing data collection and use, then please note that you are agreeing to the transfer of your
                                    information to Israel and processing globally. By providing your information to the Service, you consent to any transfer and processing in accordance with this Privacy Policy.

                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>UPDATE YOUR INFORMATION OR POSE A QUESTION OR SUGGESTION</Text>{'\n'}{'\n'}
                                    If you would like to update or correct any information that you have provided to us through your use
                                    of the Service or otherwise, or if you have suggestions for improving this Privacy Policy, then please send an e-mail to 
                                    {'\n'}<Text style={{color:"#66cfff",textDecorationLine:'underline',textDecorationColor:'#66cfff'}} >Getyourlolos@gmail.com</Text> {'\n'}

                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>CHANGES TO OUR PRIVACY POLICY AND PRACTICES</Text>{'\n'}{'\n'}

                                    We may revise this Privacy Policy, so please review it periodically.
                                    Posting of Revised Privacy Policy. We will post any adjustments to the Privacy Policy on this web
                                    page, and the revised version will be effective when it is posted. If you are concerned about how
                                    your information is used, then bookmark this page and read this Privacy Policy periodically.



                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>New Uses of Personal Information</Text>{'\n'}{'\n'}
                                    From time to time, we may desire to use Personal Information for uses not previously disclosed in our Privacy Policy. If our practices change regarding previously collected Personal Information in a way that would be materially less restrictive than stated in the
                                    version of this Privacy Policy in effect at the time we collected the information, then we will make
                                    reasonable efforts to provide notice and obtain consent to any such uses as may be required by law.

                                    {'\n'}{'\n'}
                                    <Text style={{color:'#ff009d',fontWeight:'600'}}>Contact Information</Text>{'\n'}{'\n'}
                                    Lolos
                                    Halamish 14, Caesarea
                                    Israel 
                                    {'\n'}<Text style={{color:"#66cfff",textDecorationLine:'underline',textDecorationColor:'#66cfff'}} >LolosPrivacy@gmail.com</Text> {'\n'}
                                </Text>
                            </ScrollView>
                        </View>
        )
    }
}
