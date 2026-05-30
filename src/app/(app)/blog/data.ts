export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  color: 'violet' | 'pink' | 'green' | 'amber' | 'blue';
}

// --- Relationships & Feelings ---
import { post as powerOfAnonymousFeedback } from './posts/power-of-anonymous-feedback';
import { post as expressingFeelingsYouCantSayOutLoud } from './posts/expressing-feelings-you-cant-say-out-loud';
import { post as whyPeopleSendAnonymousLoveConfessions } from './posts/why-people-send-anonymous-love-confessions';
import { post as howAnonymousMessagesStrengthenFriendships } from './posts/how-anonymous-messages-strengthen-friendships';
import { post as anonymousComplimentsBoostSelfEsteem } from './posts/anonymous-compliments-boost-self-esteem';
import { post as howCouplesUseAnonymousFeedback } from './posts/how-couples-use-anonymous-feedback';
import { post as theArtOfGivingHonestCompliments } from './posts/the-art-of-giving-honest-compliments';
import { post as anonymousMessagingForLongDistanceFriends } from './posts/anonymous-messaging-for-long-distance-friends';

// --- Mental Health & Self-Discovery ---
import { post as navigatingDigitalMentalHealth } from './posts/navigating-digital-mental-health';
import { post as thePsychologyOfSecrets } from './posts/the-psychology-of-secrets';
import { post as overcomingSocialAnxietyWithAnonymousMessaging } from './posts/overcoming-social-anxiety-with-anonymous-messaging';
import { post as selfDiscoveryThroughHonestFeedback } from './posts/self-discovery-through-honest-feedback';
import { post as imposterSyndromeAndAnonymousSupport } from './posts/imposter-syndrome-and-anonymous-support';
import { post as buildingConfidenceThroughAnonymousPraise } from './posts/building-confidence-through-anonymous-praise';
import { post as theScienceOfEmotionalRelease } from './posts/the-science-of-emotional-release';
import { post as howConfessionWallsBuildEmpathy } from './posts/how-confession-walls-build-empathy';

// --- Culture, Gen Z & Society ---
import { post as whyGenzPrefersAnonymity } from './posts/why-genz-prefers-anonymity';
import { post as theEvolutionOfSocialMedia } from './posts/the-evolution-of-social-media';
import { post as theFutureOfAnonymousApps } from './posts/the-future-of-anonymous-apps';
import { post as socialMediaFatigueEscapeToAuthenticity } from './posts/social-media-fatigue-escape-to-authenticity';
import { post as whyWeCraveValidationFromStrangers } from './posts/why-we-crave-validation-from-strangers';
import { post as whyAnonymityMakesPeopleKinder } from './posts/why-anonymity-makes-people-kinder';
import { post as introvertGuideToHonestConnection } from './posts/introvert-guide-to-honest-connection';
import { post as whyHonestFeedbackIsBetterThanLikes } from './posts/why-honest-feedback-is-better-than-likes';

// --- Safety & Privacy ---
import { post as stayingSafeOnline } from './posts/staying-safe-online';
import { post as impactOfCyberbullyingAndPrevention } from './posts/impact-of-cyberbullying-and-prevention';
import { post as howToDealWithOnlineHarassment } from './posts/how-to-deal-with-online-harassment';
import { post as digitalFootprintAndPrivacy } from './posts/digital-footprint-and-privacy';
import { post as digitalTrustAnonymity } from './posts/digital-trust-anonymity';
import { post as anonymousMessagingVsDataHarvestingApps } from './posts/anonymous-messaging-vs-data-harvesting-apps';
import { post as onlinePrivacyMythsDebunked } from './posts/online-privacy-myths-debunked';
import { post as whyPrivacyIsAFundamentalRight } from './posts/why-privacy-is-a-fundamental-right';

// --- Technology & Tips ---
import { post as understandingAiContentModeration } from './posts/understanding-ai-content-moderation';
import { post as ethicalAiInAnonymousPlatforms } from './posts/ethical-ai-in-anonymous-platforms';
import { post as howToGetMoreAnonymousMessages } from './posts/how-to-get-more-anonymous-messages';
import { post as bestQuestionsToAskAnonymously } from './posts/best-questions-to-ask-anonymously';
import { post as howToRespondToAnonymousMessages } from './posts/how-to-respond-to-anonymous-messages';
import { post as creativeWaysAnonymousMessaging } from './posts/creative-ways-anonymous-messaging';
import { post as howToUseInstagramStories } from './posts/how-to-use-instagram-stories';

// --- Tutorials & Sharing ---
import { post as sharingYourLinkOnSnapchatGuide } from './posts/sharing-your-link-on-snapchat-guide';
import { post as sharingAnonymousLinkOnWhatsapp } from './posts/sharing-anonymous-link-on-whatsapp';
import { post as anonymousMessagingForBirthdaySurprises } from './posts/anonymous-messaging-for-birthday-surprises';
import { post as truthOrDareWithAnonymousMessages } from './posts/truth-or-dare-with-anonymous-messages';
import { post as collegeIcebreakersUsingAnonymousMessages } from './posts/college-icebreakers-using-anonymous-messages';
import { post as anonymousFeedbackForStudentLeaders } from './posts/anonymous-feedback-for-student-leaders';
import { post as howTeachersUseAnonymousFeedback } from './posts/how-teachers-use-anonymous-feedback';

// --- Workplace & Education ---
import { post as benefitsOfWorkplaceAnonymity } from './posts/benefits-of-workplace-anonymity';
import { post as anonymousFeedbackForStartupTeams } from './posts/anonymous-feedback-for-startup-teams';
import { post as remoteWorkAndHonestCommunication } from './posts/remote-work-and-honest-communication';
import { post as howLeadersUseAnonymousFeedback } from './posts/how-leaders-use-anonymous-feedback';
import { post as anonymousMessagingForEventFeedback } from './posts/anonymous-messaging-for-event-feedback';
import { post as anonymousMessagingInMentalHealthSupport } from './posts/anonymous-messaging-in-mental-health-support';
import { post as anonymousFeedbackAndSchoolCulture } from './posts/anonymous-feedback-and-school-culture';

export const blogPosts: BlogPost[] = [
  // Newest first
  anonymousFeedbackForStartupTeams,
  anonymousMessagingVsDataHarvestingApps,
  sharingYourLinkOnSnapchatGuide,
  howToGetMoreAnonymousMessages,
  socialMediaFatigueEscapeToAuthenticity,
  ethicalAiInAnonymousPlatforms,
  sharingAnonymousLinkOnWhatsapp,
  whyWeCraveValidationFromStrangers,
  remoteWorkAndHonestCommunication,
  overcomingSocialAnxietyWithAnonymousMessaging,
  anonymousMessagingForBirthdaySurprises,
  selfDiscoveryThroughHonestFeedback,
  truthOrDareWithAnonymousMessages,
  imposterSyndromeAndAnonymousSupport,
  expressingFeelingsYouCantSayOutLoud,
  bestQuestionsToAskAnonymously,
  whyPeopleSendAnonymousLoveConfessions,
  collegeIcebreakersUsingAnonymousMessages,
  howAnonymousMessagesStrengthenFriendships,
  howLeadersUseAnonymousFeedback,
  anonymousComplimentsBoostSelfEsteem,
  onlinePrivacyMythsDebunked,
  howCouplesUseAnonymousFeedback,
  howToRespondToAnonymousMessages,
  whyAnonymityMakesPeopleKinder,
  theArtOfGivingHonestCompliments,
  buildingConfidenceThroughAnonymousPraise,
  introvertGuideToHonestConnection,
  anonymousMessagingForLongDistanceFriends,
  anonymousFeedbackForStudentLeaders,
  theScienceOfEmotionalRelease,
  howTeachersUseAnonymousFeedback,
  howConfessionWallsBuildEmpathy,
  whyPrivacyIsAFundamentalRight,
  whyHonestFeedbackIsBetterThanLikes,
  anonymousMessagingForEventFeedback,
  navigatingDigitalMentalHealth,
  anonymousMessagingInMentalHealthSupport,
  whyGenzPrefersAnonymity,
  anonymousFeedbackAndSchoolCulture,
  impactOfCyberbullyingAndPrevention,
  powerOfAnonymousFeedback,
  theEvolutionOfSocialMedia,
  howToUseInstagramStories,
  benefitsOfWorkplaceAnonymity,
  understandingAiContentModeration,
  stayingSafeOnline,
  creativeWaysAnonymousMessaging,
  thePsychologyOfSecrets,
  digitalFootprintAndPrivacy,
  digitalTrustAnonymity,
  howToDealWithOnlineHarassment,
  theFutureOfAnonymousApps,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}
