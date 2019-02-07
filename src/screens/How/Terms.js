import React,{Component} from 'react';
import {Container, Header, Content, Footer, FooterTab, Button,Input, Icon, Body, Right, Left,Title, Card, Badge, CardItem} from 'native-base';
import {View,Dimensions,Image,TouchableOpacity,FlatList,TextInput,Text, Platform, AsyncStorage, ActivityIndicator , ScrollView} from 'react-native';
import styles from './style'
export default class Terms extends Component{
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
                            <ScrollView showsVerticalScrollIndicator={false} >
                               
                                
                                    
                                    <Text style={{color:'#ff009d',fontWeight:'600',marginLeft:10,marginVertical:20}}>signing up to Lolos you are agreeing to our Terms and Conditions.</Text>

                                    <Text style={{color:'#ff009d',fontWeight:'600',marginLeft:10,marginVertical:10}}>Terms and Conditions</Text>

                                <Text style={styles.privacyText}>
                                    
                                    1.	Contractual Relationship{'\n'}

                                    1.1 These Conditions of use (“Conditions”) govern the access or use by you, an individual, and applications, websites, content, products and services (“Services”) made available by <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>

                                     {'\n'}                   
                                    1.2 Please read these Conditions very carefully before accessing or using the Services.{'\n'}


                                    1.3 Your access or use of the Services constitutes your agreement to be bound by these Conditions, which establishes a contractual relationship between you and <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>   {'\n'}


                                    1.4 The access or use of the Services by any child under your parental responsibility constitutes your agreement to be bound by these Conditions, which establishes a contractual relationship between you and <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>.{'\n'}


                                    1.4 IF YOU DO NOT AGREE TO THESE TERMS, YOU OR ANY CHILD UNDER YOUR PARENTAL RESPONSIBILITY MAY NOT ACCESS OR USE THE SERVICES.{'\n'}

                                            {'\n'}
                                    2.	Definitions{'\n'}{'\n'}


                                    2.1 In these Conditions, the following terms will be understood as follows:


                                    “Conditions” means these Conditions of use (as may be amended from time to time);


                                    “Services” means the applications, websites, content, products and services made available by <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> ;


                                    “<Text style={{color:'#ff009d'}} >Lolos</Text>” means <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> ;


                                    “You” means any individual using the Services;


                                    “Users” means those using the Services collectively;


                                    “Membership Account” means a basic account opened and maintained pursuant to these Conditions;


                                    “Intellectual Property Rights” means all intellectual property rights wherever in the world arising, whether registered or unregistered (and including any application), including (without limitation) copyright, confidential information, patents, patentable rights, rights in know-how, database rights, trademarks, service marks, logos, URLs, domain names and design rights;


                                    “Personal Data” means any personal information provided by you via the Services including (without limitation) the personal information described in  <Text style={{color:'#ff009d'}} >Lolos</Text> ’s Privacy Policy;


                                    “Submission” means any material from time to time submitted by you via the Services including (without limitation) any postings, messages, emails or other communications, and any other text, information, data, [photograph, image, audio or visual material] in whatever medium or form.

                                    {'\n'}{'\n'}

                                    3.	Information about Us{'\n'}{'\n'}


                                    3.1 The Services are owned and operated by and on behalf of  <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>.{'\n'}


                                    3.2  <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> is an Israeli company registered in Israel {'\n'}


                                    3.3 PLEASE NOTE <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> OPERATE THE SERVICES AND MEMBERSHIP ACCOUNTS TO HELP TEANAGRS & FAMILIES EARN & MANAGE  POCKET MONEY. IT IS NOT A BANK AND DOES NOT UNDERTAKE ANY ACTIVITIES WHICH ARE REGULATED BY THE FINANCIAL SERVICES AUTHORITY. WITHOUT LIMITING THE FOREGOING, IT DOES NOT HOLD ANY MONETARY DEPOSITS OR OPERATE OR MANAGE ANY FORM OF SAVINGS ACCOUNTS.


                                    3.4 If you want to ask anything about these Conditions or have any comments or complaints about the Services, please email 
                                    <Text style={{color:'#ff009d'}} >GetyourLolos @gmail.com</Text> or write to <Text style={{color:'#ff009d'}} >Lolos</Text> office address:
                                    <Text style={{color:'#ff009d'}} >Lolos{'\n'}
                                    Halamish 14, Caesarea{'\n'}
                                    Israel</Text> {'\n'}{'\n'}



                                    4.	Changes to the Services and to these Conditions{'\n'}{'\n'}


                                    4.1 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> reserve the right at any time to: (i) modify or withdraw the Services (or any part of them) without notice to you and will not be liable to you for any such modification or withdrawal; and/or (ii) change these Conditions from time to time and your continued use of the Services (or any part of them) following such change will be deemed to be your acceptance of such change.

                                    {'\n'}{'\n'}
                                    5.	Use of the Services and your Membership Account{'\n'}{'\n'}


                                    5.1 General use of the Services{'\n'}


                                    5.1.1 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> provide a pocket money earning & management facility in the Services, which helps teenagers earn manage spend pocket money in a safe environment. 
                                    {'\n'}

                                    5.1.2 The <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> Services are only intended for use by people resident in the United State of America. You must comply with all applicable laws and regulations in the country which you are resident. Lolos will not be liable for any breach by you of any such laws.
                                    {'\n'}

                                    5.1.3 By opening a Membership Account on the Services, you warrant that: (i) you are legally capable of entering into binding contracts (ii) you are at least 13 years old (iii) any personal information which you are required to provide when you apply for a Membership Account via the Services (including, without limitation, your age or the age of any child under your parental responsibility) is true, accurate, current and complete in all respects.
                                    {'\n'}

                                    5.2 Opening a Membership Account

                                    {'\n'}
                                    5.2.1 You will have to provide your mobile phone number when you submit an application for a Membership Account, which Lolos will use in order to verify your identity if you wish to access your Membership Account on future visits to the Services. Lolos will use and store these details, along with any other Personal Data you may supply from time to time in accordance with its Privacy Policy.
                                    {'\n'}

                                    5.2.2 You must restrict access to your phone to prevent unauthorized access to your account. <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> may rely on any use of the Services from your phone as being authorized by you.
{'\n'}

                                    5.2.3 Please inform <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> immediately if you have any reason to believe that your account details have become known to anyone else or if they are being, or are likely to be, used in an unauthorized manner.
{'\n'}

                                    5.3 Using your basic Membership Account
{'\n'}

                                    5.3.1 If your membership registration has been accepted, <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> will confirm this to you on-screen, at which point your Membership Account will be activated. From this time, and unless and until your Membership Account is terminated, you will be entitled, subject to any restrictions contained in these Conditions (including without limitation the Members Conduct Rules) (see Condition 5.4) to upload and/or post any Submission to or on the Services.
{'\n'}

                                    5.3.2 Please ensure that you read the Members Conduct Rules as it is a condition of your membership that you comply with such rules at all times.
{'\n'}

                                    5.4 Members Conduct Rules
{'\n'}

                                    5.4.1 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> are committed to ensuring that the Services remains fun and safe for Users. The Services rely on members making or uploading Submissions. By accessing and using the Services, you warrant that you will only use the Services for lawful purposes, and will not upload or submit to or on the Services any Submission which is a Prohibited Submission.

{'\n'}
                                    5.4.2 You acknowledge and agree that notwithstanding that <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> have the right (but not the obligation) to examine any Submission which you submit or upload to or on the Services, each such Submission is your sole responsibility and that by using the Services you may be exposed to content which you consider to be offensive or harmful.


                                    5.4.3 Subject to the Condition 9, <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> will not be liable to you for any loss or damage which you may suffer or incur as a direct or indirect result of any such exposure. You also acknowledge and agree that this means that you are responsible for the Submissions which you submit or upload to or on the Services.
{'\n'}

                                   {'\n'} 5.4.4 For the purpose of this Condition 5.4, a “Prohibited Submission” includes (without limitation) the following types of Submission:
                                   {'\n'}  (i) Submissions which infringe any third party’s Intellectual Property Rights, other proprietary rights or rights of privacy wherever in the world arising. Without limiting the foregoing, you must not include in any Submission any Personal Data relating to yourself or any third party;
                                   {'\n'}   (ii) Submissions which violate any law, statute, ordinance or regulation anywhere in the world;
                                   {'\n'}   (iii) Submissions which are defamatory, trade libelous, unlawfully threatening or unlawfully harassing, or which are otherwise objectionable or inappropriate having regard to the average User; or
                                   {'\n'}    (iiii) Submissions which contain viruses, worms, corrupt files, Trojan horses or other forms of corruptive code or any other material which may compromise the Services.


                                   {'\n'} 5.4.5 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> have the sole discretion to determine whether any Submission is a Prohibited Submission. You acknowledge and agree that although Lolos  do not and will not examine or review any Submission submitted or uploaded to or on the Services, it has the absolute right (but not the obligation) to examine any Submission and delete move, edit and/or disable access to any Submission (and/or any materials derived in whole or in part from such Submission) for any reason, at any time and without notice to you [(including, without limitation, in the event of a Notice of Infringement and/or Notice of Unlawful Activity regarding such Submission or derivative materials).]


                                   {'\n'} 5.4.6  <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> may also, at its sole discretion at any time and without notice to you:
                                   {'\n'}  (i) Contact any law enforcement agency or court of competent jurisdiction regarding any Submission which  <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> believe may constitute a Prohibited Submission and supply copies of such Submission to them and give them access to any Personal Data which is held relating to you, who submitted such a Submission; and/or
                                   {'\n'}  (ii)  <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> refer any matter to a law enforcement agency or court of competent jurisdiction where in its reasonable opinion, it considers that any matter arising from your use of the Services is of a criminal or illegal nature.


                                  {'\n'}{'\n'}  5.5 Termination of your Membership Account{'\n'}{'\n'}


                                   {'\n'}5.5.1 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> reserve the right to terminate your Membership Account without notice to you for any reason, and without limiting the generality of the foregoing, if:
{'\n'}(i) You register for membership using a personal information which is untrue, inaccurate or incomplete; or
                                   {'\n'} (ii) Your Membership Account is inactive for a consecutive period of 365 days or more; or
                                   {'\n'} (iii) You breach any of these Conditions or any other policies or guidelines set forth from time to time elsewhere on the Services (including, without limitation, the Members Conduct Rules (see Condition 5.4); or
                                   {'\n'}  (iiii) You engage in any conduct which <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> believe, in its sole discretion, to be harmful to its business or to other Users; or
                                    {'\n'} (v) Any Submission which you make or upload on or to the Services is the subject of any Notice of Infringement or Notice of Unlawful Activity; or
                                    {'\n'} (vi) If <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> decide to sell its business or assets to a third party.


                                 {'\n'}   5.5.2 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> take your privacy extremely seriously. If you wish your data to be deleted when your account is closed please notify customer services.


                                   {'\n'} 5.5.3 If your Membership Account is terminated for any reason, <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> reserve the right without notice to you to de-activate any hyperlink through which it may from time to time have given you access to your Membership Account and to permanently remove and discard any Submission you have made.

                                        {'\n'}{'\n'}
                                    6.	Your Personal Information{'\n'}{'\n'}


                                   {'\n'} 6.1 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> are committed to protecting your privacy. Our privacy policy sets out how Lolos   will use your Personal Data. When you submit your Personal Data, you are giving your consent to the collection, use and disclosure of your Personal Data as set forth in Lolos ’s Privacy Policy.

                                    {'\n'}{'\n'}
                                    7.	Ownership of Intellectual Property Rights{'\n'}{'\n'}
{'\n'}

                                    7.1 The Services contains material, including without limitation, text, photographs and other images, which is protected by copyright and/or other intellectual property rights. All intellectual property rights in the Services are owned by Lolos [or its third party licensors.] Without limiting the foregoing, Lolos own all rights, title and interest (including all Intellectual Property Rights) in and to any materials comprising any Submission or any derivative work based on any Submission.
{'\n'}

                                    7.2 Without limiting the generality of Condition 7.1, the Services also contain trademarks, including (without limitation) the Lolos   Logo. All trademarks included on the Services belong to Lolos [▪or its third party licensors.]
{'\n'}

                              {'\n'}      7.3 You may:
                              {'\n'}   (i) Download, temporarily store and print hard copies of any of the pages of the Services for personal use, or for internal, non-commercial use within your organization; and/or
                              {'\n'}   (ii) Distribute copies (in printed or electronic form) to third parties for their personal use or for their internal, non-commercial use within their organization, provided that Lolos are acknowledged as the source and copyright owner and that their attention is drawn to these terms and conditions.


                               {'\n'}     7.4 You may not:
                               {'\n'}     (i) Save as set out in Condition 7.3, systematically extract and/or copy or use any of the contents of the Services, and without limiting the foregoing, use any data mining, robots or similar data gathering and extraction tools to extract (whether on one or more occasions) for use any substantial parts of the Services; and/or
                               {'\n'}      (ii) In any way alter or adapt the text of the material on the Services or of any material copied or printed off or distributed from the Services (including without limitation any trademarks or logos included on any such material); and/or
                               {'\n'}     (iii) Remove any copyright, trademark or other intellectual property notices contained in the original material from any material copied, printed off or distributed from the Services; and/or
                               {'\n'}       (iiii) Create and/or publish any database which features any substantial part of the Services
                                    </Text>
                                    <Text style={styles.privacyText}>

                              {'\n'}      8.1.1 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> have taken every care in the preparation of the content of the Services, in particular to ensure that as far as reasonably possible all information provided is correct at the time of inclusion. However, Lolos  cannot guarantee the accuracy of such information or that it will be up to date at all times.


                            {'\n'}        8.1.2 The Services are provided on an “as is” and “as available” basis without any representation or endorsement made. Save as expressly set out in these Conditions, <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> make no warranties of any kind, whether express or implied, in relation to the Services including (without limitation) implied warranties of non-infringement, compatibility, security, accuracy, or conditions of completeness. Save as expressly set out in these Conditions, Lolos  also make no warranty that the Services will meet your requirements or will be uninterrupted, timely or error-free, or that defects will be corrected. Whilst steps have been taken to ensure that the Services is free from viruses, Lolos  make no warranty in this regard and you are responsible for ensuring that you have appropriate virus checking software. Lolos  do not accept any responsibility for and, to the fullest extent permitted by law, exclude any liability for, any loss or damage whatsoever arising out of or related to any use of, inability to use, or reliance on, the Services or any information provided on or from them.


                            {'\n'}        8.2 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> liability to you

{'\n'}
                             {'\n'}       8.2.1 The provisions of this Condition 8.3 set out <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>   entire financial liability to you in respect of any breach of these Conditions and any representation, statement or tortious act or omission including negligence, arising under or in connection with any contract entered into with you pursuant to these Conditions or otherwise relating to these Conditions.


<Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>

                                  {'\n'}  8.2.3 Subject to Condition 8.4, <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> will not be liable to you for any losses whether direct or indirect) of income or revenue, business, profits, contracts, anticipated savings, or for any incidental, indirect, special consequential loss or damage (whether direct or indirect) which arises out of or in connection with any contract entered into with you pursuant to these Conditions or otherwise relating to these Conditions.


                                 {'\n'}   8.2.4 The limitation on our liability set out in this Condition 8.3 does not exclude or limit in any way our liability:
                                 {'\n'}     (i) For death or personal injury caused by <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>   negligence;
                                 {'\n'}     (ii) For fraud or fraudulent misrepresentation; or
                                 {'\n'}     (iii) For any matter for which it would be illegal for <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> to exclude or attempt to exclude our liability.
                                                        {'\n'}{'\n'}

                                    9.	Third Party Links{'\n'}{'\n'}


                            {'\n'}        9.1 Electronic links to the Services from any other Services are prohibited without our prior written consent. Requests should be addressed to GetyourLolos@gmail.com.


                           {'\n'}         9. 2 The Services may provide links to third party services or may reference third party services and/or external resources for you to access at your own discretion. Please note that access to the content of any third  party websites or resources may be subject to terms and conditions imposed by the owner of that content which you should review before interacting via such websites or providing such third parties with information about yourself. Lolos do not endorse or accept any responsibility for the content of any third party websites and/or external resources.

                                        {'\n'}{'\n'}
                                        {'\n'}        10.	Transfer of Rights and Obligations{'\n'}{'\n'}


                             {'\n'}       10.1 The contract between you and <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> is binding on both parties’ respective successors and assigns. You may not transfer, assign, charge or otherwise dispose of a contract, or any of your rights or obligations arising under it, without our prior written consent. Lolos may transfer, assign, charge, sub-contract or otherwise dispose of a contract, or any of our rights or obligations arising under it, at any time during the term of the contract.

                                    {'\n'}{'\n'}
                                    11.	Events Outside Our Control{'\n'}{'\n'}


                                    11.1 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> not be liable or responsible for any failure to perform, or delay in performance of, any of their obligations under a contract that is caused by a Force Majeure Event (events outside our reasonable control).


{'\n'}11. 2 A Force Majeure Event includes any act, event, non-happening, omission or accident beyond <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> ’s reasonable control and includes in particular (without limitation) the following:
                                  {'\n'}  (i) Strikes, lock-outs or other industrial action.
                                  {'\n'}   (ii) Civil commotion, riot, invasion, terrorist attack or threat of terrorist attack, war (whether declared or not) or threat or preparation for war.
                                  {'\n'}   (iii) Fire, explosion, storm, flood, earthquake, subsidence, epidemic or other natural disaster.
                                  {'\n'}   (iiii) Impossibility of the use of railways, shipping, aircraft, motor transport or other means of public or private transport.
{'\n'}(v) Impossibility of the use of public or private telecommunications networks.
                                {'\n'}    (vi) The acts, decrees, legislation, regulations or restrictions of any government.


                                    11.3 <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> performance under any contract is deemed to be suspended for the period that the Force Majeure Event continues, and it will have an extension of time for performance for the duration of that period. Lolos  will use reasonable endeavors to bring the Force Majeure Event to a close or to find a solution by which our obligations under the contract may be performed despite the Force Majeure Event.

                                        {'\n'}{'\n'}
                                    12.	Waiver{'\n'}{'\n'}


                                {'\n'}    12.1 If <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> fail, at any time during the term of a contract, to insist upon strict performance of any of your obligations under the contract or any of these Conditions, or if Lolos fail to exercise any of the rights or remedies to which it is entitled under these Conditions, this shall not constitute a waiver of such rights or remedies and shall not relieve you from compliance with such obligations.

{'\n'}
                               {'\n'}     12.2 A waiver by <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> of any default shall not constitute a waiver of any subsequent default.


                                    12.3 No waiver by <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> of any of these Conditions shall be effective unless it is expressly stated to be a waiver and is communicated to you in writing.

                                    {'\n'}{'\n'}
                                    13.	Severability{'\n'}{'\n'}


                               {'\n'}     13.1 If any of these Conditions or any provisions of a contract are determined by any competent authority to be invalid, unlawful or unenforceable to any extent, such term, condition or provision will to that extent be severed from the remaining terms, conditions and provisions which will continue to be valid to the fullest extent permitted by law.

{'\n'}{'\n'}
                                    14.	Entire Agreement{'\n'}{'\n'}


                                    14.1 These Conditions and any document expressly referred to in them represent the entire agreement between you and Lolos in relation to the subject matter of any contract and supersede any prior agreement, understanding or arrangement (whether oral or in writing).
                                    14.2 You acknowledge that, in entering into a contract, neither you or <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> has relied on any representation, undertaking or promise given by the other or implied from anything said or written in negotiations between you and Lolos prior to such contract except as expressly stated in these terms and conditions.

{'\n'}{'\n'}
                                    15.	Third Party Rights{'\n'}{'\n'}


                                    15.1 A person who is not a party to these Conditions shall have no right under the Contract (Rights of Third Parties) Act 1999 to enforce any term of these Conditions.
{'\n'}{'\n'}

                                    16.	Law and Jurisdiction{'\n'}{'\n'}


                                    16.1 These Conditions and any other legal notices contained from time to time in the Services and all issues arising from the Services are governed by the law of the state of Israel.


                                    16.2 The courts of the state of Israel will have exclusive jurisdiction over any claim or matter arising from, or related to, a visit to the Services, and over any claim or matter arising under or in connection with these Conditions or any contract entered into with you pursuant to these Conditions, provided that nothing in this Condition 16.2 shall limit our right to take proceedings against you in any other court of competent jurisdiction.


{'\n'}{'\n'}
                                    17.Billing{'\n'}{'\n'}
                                    17.1 In the course of your use of the <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text>   Features, <Text style={{color:'#ff009d',fontStyle:'italic'}} >Lolos</Text> and its third party payment service provider may receive and implement updated credit card information from your credit card issuer in order to prevent your actions from being interrupted by an outdated or invalid card. This disbursement of the updated credit card information is provided to Lolos  and Lolos  third party payment service provider at the sole election of your credit card issuer. Your credit card issuer may give you the right to opt-out of the update service. Should you desire to do so, please contact your credit card issuer.






                                </Text>
                            </ScrollView>
                        </View>
        )
    }
}
