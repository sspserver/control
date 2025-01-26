import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Any: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  ID64: { input: any; output: any; }
  Int64: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Map: { input: any; output: any; }
  NullableJSON: { input: any; output: any; }
  Time: { input: any; output: any; }
  TimeDuration: { input: any; output: any; }
  UUID: { input: any; output: any; }
  Uint64: { input: any; output: any; }
};

/** Account is a company account that can be used to login to the system. */
export type Account = {
  __typename?: 'Account';
  /** The primary key of the Account */
  ID: Scalars['ID64']['output'];
  /**
   * clientURI is an URL string of a web page providing information about the client.
   * If present, the server SHOULD display this URL to the end-user in
   * a clickable fashion.
   */
  clientURI: Scalars['String']['output'];
  /**
   * contacts is a array of strings representing ways to contact people responsible
   * for this client, typically email addresses.
   */
  contacts?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['Time']['output'];
  description: Scalars['String']['output'];
  /** logoURI is an URL string that references a logo for the client. */
  logoURI: Scalars['String']['output'];
  /**
   * policyURI is a URL string that points to a human-readable privacy policy document
   * that describes how the deployment organization collects, uses,
   * retains, and discloses personal data.
   */
  policyURI: Scalars['String']['output'];
  /** Status of Account active */
  status: ApproveStatus;
  /** Message which defined during user approve/rejection process */
  statusMessage?: Maybe<Scalars['String']['output']>;
  /**
   * termsOfServiceURI is a URL string that points to a human-readable terms of service
   * document for the client that describes a contractual relationship
   * between the end-user and the client that the end-user accepts when
   * authorizing the client.
   */
  termsOfServiceURI: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

/** AccountConnection implements collection accessor interface with pagination. */
export type AccountConnection = {
  __typename?: 'AccountConnection';
  /** The edges for each of the account's lists */
  edges?: Maybe<Array<AccountEdge>>;
  /** A list of the accounts, as a convenience when edges are not needed. */
  list?: Maybe<Array<Account>>;
  /** Information for paginating this connection */
  pageInfo: PageInfo;
  /** The total number of campaigns */
  totalCount: Scalars['Int']['output'];
};

export type AccountCreateInput = {
  account: AccountInput;
  owner?: InputMaybe<UserInput>;
  ownerID?: InputMaybe<Scalars['ID64']['input']>;
  password: Scalars['String']['input'];
};

export type AccountCreatePayload = {
  __typename?: 'AccountCreatePayload';
  /** The account object */
  account: Account;
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** The user object */
  owner: User;
};

export type AccountEdge = {
  __typename?: 'AccountEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Account>;
};

export type AccountInput = {
  clientURI?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  logoURI?: InputMaybe<Scalars['String']['input']>;
  policyURI?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApproveStatus>;
  termsOfServiceURI?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AccountListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  UserID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  status?: InputMaybe<Array<ApproveStatus>>;
  title?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AccountListOrder = {
  ID?: InputMaybe<Ordering>;
  status?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
};

/** AccountPayload wrapper to access of Account oprtation results */
export type AccountPayload = {
  __typename?: 'AccountPayload';
  /** Account object accessor */
  account?: Maybe<Account>;
  /** Account ID operation result */
  accountID: Scalars['ID64']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

/** The list of statuses that shows is particular object active or paused */
export enum ActiveStatus {
  /** Status of the active object */
  Active = 'ACTIVE',
  /** All object by default have to be paused */
  Paused = 'PAUSED'
}

/** AdCampaign object represents an advertising campaign. */
export type AdCampaign = {
  __typename?: 'AdCampaign';
  ID: Scalars['ID64']['output'];
  /** Owner/moderator company of the AdCampaign */
  accountID: Scalars['ID64']['output'];
  /** Active status of the campaign */
  active: ActiveStatus;
  age?: Maybe<Array<Scalars['Int']['output']>>;
  browsers?: Maybe<Array<Scalars['Int64']['output']>>;
  budget?: Maybe<Scalars['Float']['output']>;
  categories?: Maybe<Array<Scalars['Int64']['output']>>;
  /** Context of the campaign */
  context?: Maybe<Scalars['NullableJSON']['output']>;
  /** Time marks */
  createdAt: Scalars['Time']['output'];
  creatorID: Scalars['ID64']['output'];
  /** Money limit counters */
  dailyBudget?: Maybe<Scalars['Float']['output']>;
  dailyTestBudget?: Maybe<Scalars['Float']['output']>;
  dateEnd?: Maybe<Scalars['Time']['output']>;
  dateStart?: Maybe<Scalars['Time']['output']>;
  deletedAt?: Maybe<Scalars['Time']['output']>;
  deviceTypes?: Maybe<Array<Scalars['Int64']['output']>>;
  devices?: Maybe<Array<Scalars['Int64']['output']>>;
  domains?: Maybe<Array<Scalars['String']['output']>>;
  geos?: Maybe<Array<Scalars['String']['output']>>;
  hours?: Maybe<Scalars['String']['output']>;
  languages?: Maybe<Array<Scalars['String']['output']>>;
  os?: Maybe<Array<Scalars['Int64']['output']>>;
  /** Private status of the campaign */
  private: PrivateStatus;
  sex?: Maybe<Array<Scalars['Int']['output']>>;
  /** Status of the campaign */
  status: ApproveStatus;
  testBudget?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  trace?: Maybe<Array<Scalars['String']['output']>>;
  tracePercent?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Time']['output'];
  /** Targeting scope information */
  zones?: Maybe<Array<Scalars['Int64']['output']>>;
};

/** AdCampaignConnection wrapper to access AdCampaign objects */
export type AdCampaignConnection = {
  __typename?: 'AdCampaignConnection';
  /** Edges of AdCampaign objects */
  edges: Array<AdCampaignEdge>;
  /** List of AdCampaign objects */
  list: Array<AdCampaign>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of AdCampaign objects */
  totalCount: Scalars['Int']['output'];
};

/** AdCampaignEdge wrapper to access AdCampaign objects */
export type AdCampaignEdge = {
  __typename?: 'AdCampaignEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The AdCampaign at the end of AdCampaignEdge. */
  node: AdCampaign;
};

export type AdCampaignInput = {
  accountID?: InputMaybe<Scalars['ID64']['input']>;
  active?: InputMaybe<ActiveStatus>;
  age?: InputMaybe<Array<Scalars['Int']['input']>>;
  browsers?: InputMaybe<Array<Scalars['Int64']['input']>>;
  budget?: InputMaybe<Scalars['Float']['input']>;
  categories?: InputMaybe<Array<Scalars['Int64']['input']>>;
  context?: InputMaybe<Scalars['NullableJSON']['input']>;
  creatorID?: InputMaybe<Scalars['ID64']['input']>;
  dailyBudget?: InputMaybe<Scalars['Float']['input']>;
  dailyTestBudget?: InputMaybe<Scalars['Float']['input']>;
  dateEnd?: InputMaybe<Scalars['Time']['input']>;
  dateStart?: InputMaybe<Scalars['Time']['input']>;
  deviceTypes?: InputMaybe<Array<Scalars['Int64']['input']>>;
  devices?: InputMaybe<Array<Scalars['Int64']['input']>>;
  domains?: InputMaybe<Array<Scalars['String']['input']>>;
  geos?: InputMaybe<Array<Scalars['String']['input']>>;
  hours?: InputMaybe<Scalars['String']['input']>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  os?: InputMaybe<Array<Scalars['Int64']['input']>>;
  private?: InputMaybe<PrivateStatus>;
  sex?: InputMaybe<Array<Scalars['Int']['input']>>;
  status?: InputMaybe<ApproveStatus>;
  testBudget?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trace?: InputMaybe<Array<Scalars['String']['input']>>;
  tracePercent?: InputMaybe<Scalars['Int']['input']>;
  zones?: InputMaybe<Array<Scalars['Int64']['input']>>;
};

export type AdCampaignListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  accountID?: InputMaybe<Scalars['ID64']['input']>;
};

export type AdCampaignListOrder = {
  ID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  deletedAt?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** AdCampaignPayload wrapper to access AdCampaign operation results */
export type AdCampaignPayload = {
  __typename?: 'AdCampaignPayload';
  /** The AdCampaign object accessible by a client. */
  campaign: AdCampaign;
  /** The AdCampaign that was created or updated by this mutation. */
  campaignID: Scalars['ID64']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

export type AdFormat = {
  __typename?: 'AdFormat';
  /** Ad format ID */
  ID: Scalars['ID64']['output'];
  /** Active status of the ad format */
  active: ActiveStatus;
  /** Codename of the ad format */
  codename: Scalars['String']['output'];
  /** Configurations of the ad format which includes structure of assets and their properties */
  config: Scalars['NullableJSON']['output'];
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Ad format description */
  description: Scalars['String']['output'];
  /** Height of the ad format */
  height: Scalars['Int']['output'];
  /** Minimum height of the ad format */
  minHeight: Scalars['Int']['output'];
  /** Minimum width of the ad format */
  minWidth: Scalars['Int']['output'];
  /** Ad format title */
  title: Scalars['String']['output'];
  /** Ad format type */
  type: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  /** Width of the ad format */
  width: Scalars['Int']['output'];
};

export type AdFormatConnection = {
  __typename?: 'AdFormatConnection';
  /** Edges of AdFormat objects */
  edges: Array<AdFormatEdge>;
  /** List of AdFormat objects */
  list: Array<AdFormat>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  /** Total count of AdFormat objects */
  totalCount: Scalars['Int']['output'];
};

export type AdFormatEdge = {
  __typename?: 'AdFormatEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The AdFormat at the end of the edge */
  node: AdFormat;
};

/** Input for querying ad formats */
export type AdFormatInput = {
  /** Active status of the ad format */
  active?: InputMaybe<ActiveStatus>;
  /** Codename of the ad format */
  codename?: InputMaybe<Scalars['String']['input']>;
  /** Configurations of the ad format which includes structure of assets and their properties */
  config?: InputMaybe<Scalars['JSON']['input']>;
  /** Ad format description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Height of the ad format */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum height of the ad format */
  minHeight?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum width of the ad format */
  minWidth?: InputMaybe<Scalars['Int']['input']>;
  /** Ad format title */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Ad format type */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Width of the ad format */
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type AdFormatListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  active?: InputMaybe<Array<ActiveStatus>>;
  codename?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AdFormatListOrder = {
  ID?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  codename?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
  type?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

export type AdFormatPayload = {
  __typename?: 'AdFormatPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** The AdFormat object accessible by a client. */
  format: AdFormat;
  /** The AdFormat that was created by this mutation. */
  formatID: Scalars['ID64']['output'];
};

export enum AnyIPv4IPv6 {
  Any = 'ANY',
  IPv4 = 'IPv4',
  IPv6 = 'IPv6'
}

export enum AnyOnlyExclude {
  Any = 'ANY',
  Exclude = 'EXCLUDE',
  Only = 'ONLY'
}

/** Application object represents a site or mobile/desktop application. */
export type Application = {
  __typename?: 'Application';
  ID: Scalars['ID64']['output'];
  /** Unique application identifier, e.g., site domain or app bundle */
  URI: Scalars['String']['output'];
  accountID: Scalars['ID64']['output'];
  /** Active status of the application */
  active: ActiveStatus;
  /** Categories associated with the application */
  categories?: Maybe<Array<Scalars['Int']['output']>>;
  /** Time marks */
  createdAt: Scalars['Time']['output'];
  creatorID: Scalars['ID64']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  description: Scalars['String']['output'];
  platform: PlatformType;
  premium: Scalars['Boolean']['output'];
  /** Private status of the application */
  private: PrivateStatus;
  /** Revenue share percentage with the publisher */
  revenueShare?: Maybe<Scalars['Float']['output']>;
  /** Status of the application */
  status: ApproveStatus;
  title: Scalars['String']['output'];
  type: ApplicationType;
  updatedAt: Scalars['Time']['output'];
};

/** ApplicationConnection wrapper to access Application objects */
export type ApplicationConnection = {
  __typename?: 'ApplicationConnection';
  /** Edges of Application objects */
  edges: Array<ApplicationEdge>;
  /** List of Application objects */
  list: Array<Application>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of Application objects */
  totalCount: Scalars['Int']['output'];
};

/** ApplicationEdge wrapper to access Application objects */
export type ApplicationEdge = {
  __typename?: 'ApplicationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Application at the end of ApplicationEdge. */
  node: Application;
};

export type ApplicationInput = {
  /** Unique application identifier, e.g., site domain or app bundle */
  URI?: InputMaybe<Scalars['String']['input']>;
  /** Account ID associated with the application and can be defined if have permission */
  accountID?: InputMaybe<Scalars['ID64']['input']>;
  active?: InputMaybe<ActiveStatus>;
  categories?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<PlatformType>;
  premium?: InputMaybe<Scalars['Boolean']['input']>;
  private?: InputMaybe<PrivateStatus>;
  revenueShare?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ApproveStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ApplicationType>;
};

export type ApplicationListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  URI?: InputMaybe<Scalars['String']['input']>;
  accountID?: InputMaybe<Scalars['ID64']['input']>;
  active?: InputMaybe<ActiveStatus>;
  platform?: InputMaybe<Array<PlatformType>>;
  premium?: InputMaybe<Scalars['Boolean']['input']>;
  private?: InputMaybe<PrivateStatus>;
  status?: InputMaybe<ApproveStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<ApplicationType>>;
};

export type ApplicationListOrder = {
  ID?: InputMaybe<Ordering>;
  URI?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  deletedAt?: InputMaybe<Ordering>;
  platform?: InputMaybe<Ordering>;
  premium?: InputMaybe<Ordering>;
  status?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
  type?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** ApplicationPayload wrapper to access Application operation results */
export type ApplicationPayload = {
  __typename?: 'ApplicationPayload';
  /** The Application object accessible by a client. */
  application: Application;
  /** The Application that was created or updated by this mutation. */
  applicationID: Scalars['ID64']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

export enum ApplicationType {
  App = 'APP',
  Game = 'GAME',
  Site = 'SITE',
  Undefined = 'UNDEFINED'
}

/** The list of statuses that shows is object approved or not */
export enum ApproveStatus {
  /** Approved status of object could be obtained from the some authorized user who have permissions */
  Approved = 'APPROVED',
  /** Pending status of the just inited objects */
  Pending = 'PENDING',
  /** Rejected status of object could be obtained from the some authorized user who have permissions */
  Rejected = 'REJECTED'
}

export enum AuctionType {
  FirstPrice = 'FIRST_PRICE',
  SecondPrice = 'SECOND_PRICE',
  Undefined = 'UNDEFINED'
}

/** AuthClient object represents an OAuth 2.0 client */
export type AuthClient = {
  __typename?: 'AuthClient';
  /** ClientID is the client ID which represents unique connection indentificator */
  ID: Scalars['ID']['output'];
  accountID: Scalars['ID64']['output'];
  /**
   * AllowedCORSOrigins are one or more URLs (scheme://host[:port]) which are allowed to make CORS requests
   * to the /oauth/token endpoint. If this array is empty, the sever's CORS origin configuration (`CORS_ALLOWED_ORIGINS`)
   * will be used instead. If this array is set, the allowed origins are appended to the server's CORS origin configuration.
   * Be aware that environment variable `CORS_ENABLED` MUST be set to `true` for this to work.
   */
  allowedCORSOrigins?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * Audience is a whitelist defining the audiences this client is allowed to request tokens for. An audience limits
   * the applicability of an OAuth 2.0 Access Token to, for example, certain API endpoints. The value is a list
   * of URLs. URLs MUST NOT contain whitespaces.
   */
  audience?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** ExpiresAt contins the time of expiration of the client */
  expiresAt: Scalars['Time']['output'];
  /**
   * GrantTypes is an array of grant types the client is allowed to use.
   *
   * Pattern: client_credentials|authorization_code|implicit|refresh_token
   */
  grantTypes?: Maybe<Array<Scalars['String']['output']>>;
  /** Public flag tells that the client is public */
  public: Scalars['Boolean']['output'];
  /** RedirectURIs is an array of allowed redirect urls for the client, for example http://mydomain/oauth/callback . */
  redirectURIs?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * ResponseTypes is an array of the OAuth 2.0 response type strings that the client can
   * use at the authorization endpoint.
   *
   * Pattern: id_token|code|token
   */
  responseTypes?: Maybe<Array<Scalars['String']['output']>>;
  /**
   * Scope is a string containing a space-separated list of scope values (as
   * described in Section 3.3 of OAuth 2.0 [RFC6749]) that the client
   * can use when requesting access tokens.
   *
   * Pattern: ([a-zA-Z0-9\.\*]+\s?)+
   */
  scope: Scalars['String']['output'];
  /**
   * Secret is the client's secret. The secret will be included in the create request as cleartext, and then
   * never again. The secret is stored using BCrypt so it is impossible to recover it. Tell your users
   * that they need to write the secret down as it will not be made available again.
   */
  secret: Scalars['String']['output'];
  /**
   * SubjectType requested for responses to this Client. The subject_types_supported Discovery parameter contains a
   * list of the supported subject_type values for this server. Valid types include `pairwise` and `public`.
   */
  subjectType: Scalars['String']['output'];
  /** Title of the AuthClient as himan readable name */
  title: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  userID: Scalars['ID64']['output'];
};

/** AuthClientConnection implements collection accessor interface with pagination. */
export type AuthClientConnection = {
  __typename?: 'AuthClientConnection';
  /** The edges for each of the AuthClient's lists */
  edges?: Maybe<Array<AuthClientEdge>>;
  /** A list of the AuthClient's, as a convenience when edges are not needed. */
  list?: Maybe<Array<AuthClient>>;
  /** Information for paginating this connection */
  pageInfo: PageInfo;
  /** The total number of campaigns */
  totalCount: Scalars['Int']['output'];
};

export type AuthClientEdge = {
  __typename?: 'AuthClientEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<AuthClient>;
};

export type AuthClientInput = {
  accountID?: InputMaybe<Scalars['ID64']['input']>;
  allowedCORSOrigins?: InputMaybe<Array<Scalars['String']['input']>>;
  audience?: InputMaybe<Array<Scalars['String']['input']>>;
  expiresAt?: InputMaybe<Scalars['Time']['input']>;
  grantTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  redirectURIs?: InputMaybe<Array<Scalars['String']['input']>>;
  responseTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  scope?: InputMaybe<Scalars['String']['input']>;
  secret?: InputMaybe<Scalars['String']['input']>;
  subjectType: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  userID?: InputMaybe<Scalars['ID64']['input']>;
};

export type AuthClientListFilter = {
  ID?: InputMaybe<Array<Scalars['String']['input']>>;
  accountID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  public?: InputMaybe<Scalars['Boolean']['input']>;
  userID?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

export type AuthClientListOrder = {
  ID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  lastUpdate?: InputMaybe<Ordering>;
  public?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
  userID?: InputMaybe<Ordering>;
};

/** AuthClientPayload wrapper to access of AuthClient oprtation results */
export type AuthClientPayload = {
  __typename?: 'AuthClientPayload';
  /** AuthClient object accessor */
  authClient?: Maybe<AuthClient>;
  /** AuthClient ID operation result */
  authClientID: Scalars['ID']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

/** The list of statuses that shows is particular object is available */
export enum AvailableStatus {
  /** Status of the available object */
  Available = 'AVAILABLE',
  /** Status of the unavailable object */
  Unavailable = 'UNAVAILABLE',
  /** All object by default have to be undefined */
  Undefined = 'UNDEFINED'
}

export type Balance = {
  __typename?: 'Balance';
  balance: Scalars['Float']['output'];
  credit: Scalars['Float']['output'];
};

/** Browser model schema */
export type Browser = {
  __typename?: 'Browser';
  /** Browser ID */
  ID: Scalars['ID64']['output'];
  /** Active status of the browser */
  active: ActiveStatus;
  /** Creation time of the browser */
  createdAt: Scalars['Time']['output'];
  /** Deletion time of the browser */
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Description of the browser */
  description: Scalars['String']['output'];
  /** Match expression for the browser */
  matchExp: Scalars['String']['output'];
  /** Name of the browser */
  name: Scalars['String']['output'];
  /** Last update time of the browser */
  updatedAt: Scalars['Time']['output'];
  /** List of browser versions */
  versions?: Maybe<Array<BrowserVersion>>;
};

export type BrowserConnection = {
  __typename?: 'BrowserConnection';
  /** Edges of Browser objects */
  edges: Array<BrowserEdge>;
  /** List of Browser objects */
  list: Array<Browser>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  /** Total count of Browser objects */
  totalCount: Scalars['Int']['output'];
};

export type BrowserEdge = {
  __typename?: 'BrowserEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The Browser at the end of the edge */
  node: Browser;
};

/** Input for querying browsers */
export type BrowserInput = {
  /** Active status of the browser */
  active?: InputMaybe<ActiveStatus>;
  /** Description of the browser */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Match expression for the browser */
  matchExp?: InputMaybe<Scalars['String']['input']>;
  /** Name of the browser */
  name?: InputMaybe<Scalars['String']['input']>;
  /** List of browser versions */
  versions?: InputMaybe<Array<BrowserVersionInput>>;
};

export type BrowserListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  active?: InputMaybe<Array<ActiveStatus>>;
  name?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BrowserListOrder = {
  ID?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

export type BrowserPayload = {
  __typename?: 'BrowserPayload';
  /** The Browser object accessible by a client. */
  browser: Browser;
  /** The Browser that was created by this mutation. */
  browserID: Scalars['ID64']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

/** BrowserVersion model schema */
export type BrowserVersion = {
  __typename?: 'BrowserVersion';
  /** Maximum version */
  max: Scalars['String']['output'];
  /** Minimum version */
  min: Scalars['String']['output'];
  /** Name of the version */
  name: Scalars['String']['output'];
};

/** Input for browser versions */
export type BrowserVersionInput = {
  /** Maximum version */
  max?: InputMaybe<Scalars['String']['input']>;
  /** Minimum version */
  min?: InputMaybe<Scalars['String']['input']>;
  /** Name of the version */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Advertising category schema */
export type Category = {
  __typename?: 'Category';
  /** IAB category code of OpenRTB */
  IABCode: Scalars['String']['output'];
  /** Category ID */
  ID: Scalars['ID64']['output'];
  /** Active status of the category */
  active: ActiveStatus;
  /** Creation time of the category */
  createdAt: Scalars['Time']['output'];
  /** Deletion time of the category */
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Description of the category */
  description: Scalars['String']['output'];
  /** Name of the category */
  name: Scalars['String']['output'];
  /** Parent category object */
  parent?: Maybe<Category>;
  /** Parent category ID */
  parentID?: Maybe<Scalars['ID64']['output']>;
  /** Position of the category */
  position: Scalars['Int']['output'];
  /** Last update time of the category */
  updatedAt: Scalars['Time']['output'];
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** Edges of Category objects */
  edges: Array<CategoryEdge>;
  /** List of Category objects */
  list: Array<Category>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  /** Total count of Category objects */
  totalCount: Scalars['Int']['output'];
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The Category at the end of the edge */
  node: Category;
};

/** Input for querying categories */
export type CategoryInput = {
  /** IAB category code of OpenRTB */
  IABCode?: InputMaybe<Scalars['String']['input']>;
  /** Active status of the category */
  active?: InputMaybe<ActiveStatus>;
  /** Description of the category */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the category */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Parent category ID */
  parentID?: InputMaybe<Scalars['ID64']['input']>;
  /** Position of the category */
  position?: InputMaybe<Scalars['Int']['input']>;
};

export type CategoryListFilter = {
  IABCode?: InputMaybe<Array<Scalars['String']['input']>>;
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  active?: InputMaybe<Array<ActiveStatus>>;
  name?: InputMaybe<Array<Scalars['String']['input']>>;
  parentID?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

export type CategoryListOrder = {
  IABCode?: InputMaybe<Ordering>;
  ID?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  parentID?: InputMaybe<Ordering>;
  position?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

export type CategoryPayload = {
  __typename?: 'CategoryPayload';
  /** The Category object accessible by a client. */
  category: Category;
  /** The Category that was created by this mutation. */
  categoryID: Scalars['ID64']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

export type ChangeTransactionStatusRequest = {
  ID: Scalars['UUID']['input'];
  gatewayInfo: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type Continent = {
  __typename?: 'Continent';
  /** Continent ID */
  ID: Scalars['ID64']['output'];
  /** Continent code2 */
  code2: Scalars['String']['output'];
  /** List of countries */
  countries?: Maybe<Array<Country>>;
  /** Continent name */
  name: Scalars['String']['output'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  lat: Scalars['Float']['output'];
  lon: Scalars['Float']['output'];
};

export type Country = {
  __typename?: 'Country';
  /** Country ID */
  ID: Scalars['ID64']['output'];
  /** Name of the capital city */
  capital: Scalars['String']['output'];
  /** Country code2 */
  code2: Scalars['String']['output'];
  /** Country code3 */
  code3: Scalars['String']['output'];
  /** Continent object */
  continent: Continent;
  /** Continent code */
  continentCode: Scalars['String']['output'];
  /** Coordinates of the country */
  coordinates: Coordinates;
  /** List of currencies */
  currency?: Maybe<Array<Scalars['String']['output']>>;
  /** Languages spoken in the country */
  languages?: Maybe<Array<Scalars['String']['output']>>;
  /** Country name */
  name: Scalars['String']['output'];
  /** Country native name */
  nativeName: Scalars['String']['output'];
  /** Phone codes for the country */
  phoneCodes?: Maybe<Array<Scalars['String']['output']>>;
  /** Time zones for the country */
  timeZones?: Maybe<Array<TimeZone>>;
};

export type CreateTransactionRequest = {
  amount: Scalars['Float']['input'];
  gatewayID: Scalars['String']['input'];
  gatewayInfo: Scalars['String']['input'];
  gatewayPaymentID: Scalars['String']['input'];
  key: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

/** Device maker schema */
export type DeviceMaker = {
  __typename?: 'DeviceMaker';
  /** Device maker ID */
  ID: Scalars['ID64']['output'];
  /** Active status of the device maker */
  active: ActiveStatus;
  /** Creation time of the device maker */
  createdAt: Scalars['Time']['output'];
  /** Deletion time of the device maker */
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Description of the device type */
  description: Scalars['String']['output'];
  /** Expression to match the device maker */
  matchExp: Scalars['String']['output'];
  /** List of device models */
  models?: Maybe<Array<DeviceModel>>;
  /** Name of the device maker */
  name: Scalars['String']['output'];
  /** List of device types */
  types?: Maybe<Array<DeviceType>>;
  /** Last update time of the device maker */
  updatedAt: Scalars['Time']['output'];
};

export type DeviceMakerConnection = {
  __typename?: 'DeviceMakerConnection';
  /** Edges of DeviceMaker objects */
  edges: Array<DeviceMakerEdge>;
  /** List of DeviceMaker objects */
  list: Array<DeviceMaker>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  /** Total count of DeviceMaker objects */
  totalCount: Scalars['Int']['output'];
};

export type DeviceMakerEdge = {
  __typename?: 'DeviceMakerEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The DeviceMaker at the end of the edge */
  node: DeviceMaker;
};

/** Input for querying device makers */
export type DeviceMakerInput = {
  /** Active status of the device maker */
  active?: InputMaybe<ActiveStatus>;
  /** Description of the device maker */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Expression to match the device maker */
  matchExp?: InputMaybe<Scalars['String']['input']>;
  /** Name of the device maker */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceMakerListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  active?: InputMaybe<Array<ActiveStatus>>;
  name?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DeviceMakerListOrder = {
  ID?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

export type DeviceMakerPayload = {
  __typename?: 'DeviceMakerPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** The DeviceMaker object accessible by a client. */
  maker: DeviceMaker;
  /** The DeviceMaker that was created by this mutation. */
  makerID: Scalars['ID64']['output'];
};

/** Device model schema */
export type DeviceModel = {
  __typename?: 'DeviceModel';
  /** Device model ID */
  ID: Scalars['ID64']['output'];
  /** Active status of the device model */
  active: ActiveStatus;
  /** Creation time of the device model */
  createdAt: Scalars['Time']['output'];
  /** Deletion time of the device model */
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Description of the device type */
  description: Scalars['String']['output'];
  /** Device maker object */
  maker?: Maybe<DeviceMaker>;
  /** Device maker ID */
  makerID: Scalars['ID64']['output'];
  /** Expression to match the device model */
  matchExp: Scalars['String']['output'];
  /** Name of the device model */
  name: Scalars['String']['output'];
  /** Device type object */
  type?: Maybe<DeviceType>;
  /** Device type ID */
  typeID: Scalars['ID64']['output'];
  /** Last update time of the device model */
  updatedAt: Scalars['Time']['output'];
  /** List of device model versions */
  versions?: Maybe<Array<DeviceModelVersion>>;
};

export type DeviceModelConnection = {
  __typename?: 'DeviceModelConnection';
  /** Edges of DeviceModel objects */
  edges: Array<DeviceModelEdge>;
  /** List of DeviceModel objects */
  list: Array<DeviceModel>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  /** Total count of DeviceModel objects */
  totalCount: Scalars['Int']['output'];
};

export type DeviceModelEdge = {
  __typename?: 'DeviceModelEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The DeviceModel at the end of the edge */
  node: DeviceModel;
};

/** Input for querying device models */
export type DeviceModelInput = {
  /** Active status of the device model */
  active?: InputMaybe<ActiveStatus>;
  /** Description of the device model */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Device maker ID */
  makerID?: InputMaybe<Scalars['ID64']['input']>;
  /** Expression to match the device model */
  matchExp?: InputMaybe<Scalars['String']['input']>;
  /** Name of the device model */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Device type ID */
  typeID?: InputMaybe<Scalars['ID64']['input']>;
  /** List of device model versions */
  versions?: InputMaybe<Array<DeviceModelVersionInput>>;
};

export type DeviceModelListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  active?: InputMaybe<Array<ActiveStatus>>;
  makerID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  name?: InputMaybe<Array<Scalars['String']['input']>>;
  typeID?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

export type DeviceModelListOrder = {
  ID?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  makerID?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  typeID?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

export type DeviceModelPayload = {
  __typename?: 'DeviceModelPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** The DeviceModel object accessible by a client. */
  model: DeviceModel;
  /** The DeviceModel that was created by this mutation. */
  modelID: Scalars['ID64']['output'];
};

/** DeviceModelVersion model schema */
export type DeviceModelVersion = {
  __typename?: 'DeviceModelVersion';
  /** Maximum version */
  max: Scalars['String']['output'];
  /** Minimum version */
  min: Scalars['String']['output'];
  /** Name of the version */
  name: Scalars['String']['output'];
};

export type DeviceModelVersionInput = {
  /** Maximum version */
  max?: InputMaybe<Scalars['String']['input']>;
  /** Minimum version */
  min?: InputMaybe<Scalars['String']['input']>;
  /** Name of the version */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Device type schema */
export type DeviceType = {
  __typename?: 'DeviceType';
  /** Device type ID */
  ID: Scalars['ID64']['output'];
  /** Active status of the device type */
  active: ActiveStatus;
  /** Description of the device type */
  description: Scalars['String']['output'];
  /** List of device models */
  models?: Maybe<Array<DeviceModel>>;
  /** Name of the device type */
  name: Scalars['String']['output'];
};

export type DirectAccessToken = {
  __typename?: 'DirectAccessToken';
  ID: Scalars['ID64']['output'];
  accountID: Scalars['ID64']['output'];
  createdAt: Scalars['Time']['output'];
  description: Scalars['String']['output'];
  expiresAt: Scalars['Time']['output'];
  token: Scalars['String']['output'];
  userID?: Maybe<Scalars['ID64']['output']>;
};

export type DirectAccessTokenConnection = {
  __typename?: 'DirectAccessTokenConnection';
  /** Edges for the DirectAccessTokenConnection */
  edges?: Maybe<Array<DirectAccessTokenEdge>>;
  /** List of DirectAccessToken objects */
  list?: Maybe<Array<DirectAccessToken>>;
  /** PageInfo for the DirectAccessTokenConnection */
  pageInfo: PageInfo;
  /** Total count of DirectAccessToken objects */
  totalCount: Scalars['Int']['output'];
};

export type DirectAccessTokenEdge = {
  __typename?: 'DirectAccessTokenEdge';
  /** Cursor for pagination */
  cursor: Scalars['String']['output'];
  /** Node for the edge */
  node?: Maybe<DirectAccessToken>;
};

export type DirectAccessTokenListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  accountID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  maxExpiresAt?: InputMaybe<Scalars['Time']['input']>;
  minExpiresAt?: InputMaybe<Scalars['Time']['input']>;
  token?: InputMaybe<Array<Scalars['String']['input']>>;
  userID?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

export type DirectAccessTokenListOrder = {
  ID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  expiresAt?: InputMaybe<Ordering>;
  token?: InputMaybe<Ordering>;
  userID?: InputMaybe<Ordering>;
};

export type DirectAccessTokenPayload = {
  __typename?: 'DirectAccessTokenPayload';
  /** Unique identifier for the client performing the mutation */
  clientMutationID: Scalars['String']['output'];
  /** DirectAccessToken ID operation result */
  token?: Maybe<DirectAccessToken>;
};

/** HistoryAction is the model for history actions. */
export type HistoryAction = {
  __typename?: 'HistoryAction';
  ID: Scalars['UUID']['output'];
  RequestID: Scalars['String']['output'];
  accountID: Scalars['ID64']['output'];
  actionAt: Scalars['Time']['output'];
  data: Scalars['NullableJSON']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  objectID: Scalars['ID64']['output'];
  objectIDs: Scalars['String']['output'];
  objectType: Scalars['String']['output'];
  userID: Scalars['ID64']['output'];
};

/** A connection to a list of items. */
export type HistoryActionConnection = {
  __typename?: 'HistoryActionConnection';
  /** Edges for the HistoryActionConnection connection. */
  edges?: Maybe<Array<HistoryActionEdge>>;
  /** A list of nodes in the connection (without going through the `edges` field). */
  list?: Maybe<Array<HistoryAction>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of nodes in this connection, ignoring pagination. */
  totalCount: Scalars['Int']['output'];
};

/** Edge of action history object. */
export type HistoryActionEdge = {
  __typename?: 'HistoryActionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: HistoryAction;
};

export type HistoryActionListFilter = {
  ID?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** The request ID of the action */
  RequestID?: InputMaybe<Array<Scalars['String']['input']>>;
  /** List of accounts that the user belongs to */
  accountID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  /** The name of the action */
  name?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Object ID of the model that the action is performed on */
  objectID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  /** Object ID string version of the model that the action is performed on */
  objectIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Type of the object that the action is performed on */
  objectType?: InputMaybe<Array<Scalars['String']['input']>>;
  /** List of users who made the action */
  userID?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

/** HistoryActionListOptions contains the options for listing history actions ordering. */
export type HistoryActionListOrder = {
  ID?: InputMaybe<Ordering>;
  RequestID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  actionAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  objectID?: InputMaybe<Ordering>;
  objectIDs?: InputMaybe<Ordering>;
  objectType?: InputMaybe<Ordering>;
  userID?: InputMaybe<Ordering>;
};

/** HistoryActionPayload contains the information about a history action. */
export type HistoryActionPayload = {
  __typename?: 'HistoryActionPayload';
  /** The action object */
  action: HistoryAction;
  /** The history action object ID */
  actionID: Scalars['UUID']['output'];
  /** The client mutation id */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type InviteMemberInput = {
  /** The email of the member to invite */
  email: Scalars['String']['input'];
  /** Is the user an admin of the account */
  isAdmin?: Scalars['Boolean']['input'];
  /** The roles to assign to the member */
  roles: Array<Scalars['String']['input']>;
};

/** Account Member represents a member of the account */
export type Member = {
  __typename?: 'Member';
  /** The primary key of the Member */
  ID: Scalars['ID64']['output'];
  /** Account object accessor */
  account: Account;
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Is the user an admin of the account */
  isAdmin: Scalars['Boolean']['output'];
  /** Roles of the member */
  roles?: Maybe<Array<RbacRole>>;
  /** Status of Member active */
  status: ApproveStatus;
  updatedAt: Scalars['Time']['output'];
  /** User object accessor */
  user: User;
};

export type MemberConnection = {
  __typename?: 'MemberConnection';
  /** The edges for each of the members's lists */
  edges?: Maybe<Array<MemberEdge>>;
  /** A list of the members, as a convenience when edges are not needed. */
  list?: Maybe<Array<Member>>;
  /** Information for paginating this connection */
  pageInfo: PageInfo;
  /** The total number of campaigns */
  totalCount: Scalars['Int']['output'];
};

export type MemberEdge = {
  __typename?: 'MemberEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Member>;
};

export type MemberInput = {
  /** Is the user an admin of the account */
  isAdmin?: Scalars['Boolean']['input'];
  /** The roles to assign to the member */
  roles: Array<Scalars['String']['input']>;
};

export type MemberListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  accountID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<Array<ApproveStatus>>;
  userID?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

export type MemberListOrder = {
  ID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  isAdmin?: InputMaybe<Ordering>;
  status?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
  userID?: InputMaybe<Ordering>;
};

export type MemberPayload = {
  __typename?: 'MemberPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** Member object accessor */
  member?: Maybe<Member>;
  /** Member ID operation result */
  memberID: Scalars['ID64']['output'];
};

export enum MessangerType {
  Aim = 'AIM',
  Icq = 'ICQ',
  Phone = 'PHONE',
  Skype = 'SKYPE',
  Telegram = 'TELEGRAM',
  Viber = 'VIBER',
  Whatsapp = 'WHATSAPP'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Activate the Zone */
  activateZone: StatusResponse;
  /** Approve account and leave the comment */
  approveAccount: AccountPayload;
  /** Approve the member to join the account */
  approveAccountMember: MemberPayload;
  /** Approve the AdCampaign to start running */
  approveAdCampaign: StatusResponse;
  /** Approve the Application to be active */
  approveApplication: StatusResponse;
  /** Approve RTBAccessPoint to start receiving data from it. */
  approveRTBAccessPoint: StatusResponse;
  /** Approve RTBSource to start receiving data from it */
  approveRTBSource: StatusResponse;
  /** Approve user and leave the comment */
  approveUser: UserPayload;
  /** Approve the Zone to be active */
  approveZone: StatusResponse;
  /** Create a new AdCampaign */
  createAdCampaign: AdCampaignPayload;
  /** Create a new Application */
  createApplication: ApplicationPayload;
  /** Create the new auth client */
  createAuthClient: AuthClientPayload;
  /** Create new browser */
  createBrowser?: Maybe<BrowserPayload>;
  /** Create new category */
  createCategory?: Maybe<CategoryPayload>;
  /** Create new device maker */
  createDeviceMaker?: Maybe<DeviceMakerPayload>;
  /** Create new device model */
  createDeviceModel?: Maybe<DeviceModelPayload>;
  /** Create new ad format */
  createFormat?: Maybe<AdFormatPayload>;
  /** Create new OS */
  createOS?: Maybe<OsPayload>;
  /** Create a new RTBAccessPoint. */
  createRTBAccessPoint: RtbAccessPointPayload;
  /** Create the new RTBSource */
  createRTBSource: RtbSourcePayload;
  /** Create the new RBAC role */
  createRole: RbacRolePayload;
  /** Create the new user */
  createUser: UserPayload;
  /** Create a new Zone */
  createZone: ZonePayload;
  /** Deactivate the Zone */
  deactivateZone: StatusResponse;
  /** Delete AdCampaign */
  deleteAdCampaign?: Maybe<AdCampaignPayload>;
  /** Delete Application */
  deleteApplication?: Maybe<ApplicationPayload>;
  /** Delete auth client */
  deleteAuthClient: AuthClientPayload;
  /** Delete browser */
  deleteBrowser?: Maybe<BrowserPayload>;
  /** Delete category */
  deleteCategory?: Maybe<CategoryPayload>;
  /** Delete device maker */
  deleteDeviceMaker?: Maybe<DeviceMakerPayload>;
  /** Delete device model */
  deleteDeviceModel?: Maybe<DeviceModelPayload>;
  /** Delete ad format */
  deleteFormat?: Maybe<AdFormatPayload>;
  /** Delete OS */
  deleteOS?: Maybe<OsPayload>;
  /** Delete RTBAccessPoint. */
  deleteRTBAccessPoint?: Maybe<RtbAccessPointPayload>;
  /** Delete RTBSource */
  deleteRTBSource?: Maybe<RtbSourcePayload>;
  /** Delete RBAC role */
  deleteRole: RbacRolePayload;
  /** Delete Zone */
  deleteZone?: Maybe<ZonePayload>;
  /** Disconnect a social account */
  disconnectSocialAccount: SocialAccountPayload;
  /** Generate a new DirectAccessToken */
  generateDirectAccessToken?: Maybe<DirectAccessTokenPayload>;
  /** Invite a new member to the account */
  inviteAccountMember: MemberPayload;
  /** Login to the system and get the token as JWT session */
  login: SessionToken;
  /** Logout from the system */
  logout: Scalars['Boolean']['output'];
  /** Pause the AdCampaign */
  pauseAdCampaign: StatusResponse;
  /** Pause the Application */
  pauseApplication: StatusResponse;
  /** Pause RTBAccessPoint to stop receiving data from it. */
  pauseRTBAccessPoint: StatusResponse;
  /** Pause RTBSource to stop receiving data from it */
  pauseRTBSource: StatusResponse;
  poke: Scalars['String']['output'];
  /** Register the new account */
  registerAccount: AccountCreatePayload;
  /** Reject account and leave the comment */
  rejectAccount: AccountPayload;
  /** Reject the member to join the account */
  rejectAccountMember: MemberPayload;
  /** Reject the AdCampaign to prevent it from running */
  rejectAdCampaign: StatusResponse;
  /** Reject the Application */
  rejectApplication: StatusResponse;
  /** Reject RTBAccessPoint to stop receiving data from it. */
  rejectRTBAccessPoint: StatusResponse;
  /** Reject RTBSource to stop receiving data from it */
  rejectRTBSource: StatusResponse;
  /** Reject user and leave the comment */
  rejectUser: UserPayload;
  /** Reject the Zone */
  rejectZone: StatusResponse;
  /** Remove the member from the account */
  removeAccountMember: MemberPayload;
  /** Reset password of the particular user in case if user forgot it */
  resetUserPassword: StatusResponse;
  /** Revoke a DirectAccessToken */
  revokeDirectAccessToken?: Maybe<StatusResponse>;
  /** Run the AdCampaign */
  runAdCampaign: StatusResponse;
  /** Run the Application */
  runApplication: StatusResponse;
  /** Run RTBAccessPoint to receive data from it. */
  runRTBAccessPoint: StatusResponse;
  /** Run RTBSource to receive data from it */
  runRTBSource: StatusResponse;
  /** Set the option value */
  setOption: OptionPayload;
  /** Switch the account by ID */
  switchAccount: SessionToken;
  /** Update account info */
  updateAccount: AccountPayload;
  /** Update the member data */
  updateAccountMember: MemberPayload;
  /** Update AdCampaign information */
  updateAdCampaign: AdCampaignPayload;
  /** Update Application information */
  updateApplication: ApplicationPayload;
  /** Update auth client info */
  updateAuthClient: AuthClientPayload;
  /** Update browser */
  updateBrowser?: Maybe<BrowserPayload>;
  /** Update category */
  updateCategory?: Maybe<CategoryPayload>;
  /** Update device maker */
  updateDeviceMaker?: Maybe<DeviceMakerPayload>;
  /** Update device model */
  updateDeviceModel?: Maybe<DeviceModelPayload>;
  /** Update ad format */
  updateFormat?: Maybe<AdFormatPayload>;
  /** Update OS */
  updateOS?: Maybe<OsPayload>;
  /** Update RTBAccessPoint info. */
  updateRTBAccessPoint: RtbAccessPointPayload;
  /** Update RTBSource info */
  updateRTBSource: RtbSourcePayload;
  /** Update RBAC role info */
  updateRole: RbacRolePayload;
  /** Update user info */
  updateUser: UserPayload;
  /** Update password of the particular user */
  updateUserPassword: StatusResponse;
  /** Update Zone information */
  updateZone: ZonePayload;
};


export type MutationActivateZoneArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApproveAccountArgs = {
  id: Scalars['ID64']['input'];
  msg: Scalars['String']['input'];
};


export type MutationApproveAccountMemberArgs = {
  memberID: Scalars['ID64']['input'];
  msg?: Scalars['String']['input'];
};


export type MutationApproveAdCampaignArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApproveApplicationArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApproveRtbAccessPointArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApproveRtbSourceArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApproveUserArgs = {
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationApproveZoneArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateAdCampaignArgs = {
  input: AdCampaignInput;
};


export type MutationCreateApplicationArgs = {
  input: ApplicationInput;
};


export type MutationCreateAuthClientArgs = {
  input: AuthClientInput;
};


export type MutationCreateBrowserArgs = {
  input: BrowserInput;
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationCreateDeviceMakerArgs = {
  input: DeviceMakerInput;
};


export type MutationCreateDeviceModelArgs = {
  input: DeviceModelInput;
};


export type MutationCreateFormatArgs = {
  input: AdFormatInput;
};


export type MutationCreateOsArgs = {
  input: OsInput;
};


export type MutationCreateRtbAccessPointArgs = {
  input: RtbAccessPointInput;
};


export type MutationCreateRtbSourceArgs = {
  input: RtbSourceInput;
};


export type MutationCreateRoleArgs = {
  input: RbacRoleInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationCreateZoneArgs = {
  input: ZoneInput;
};


export type MutationDeactivateZoneArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteAdCampaignArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteApplicationArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteAuthClientArgs = {
  id: Scalars['ID']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteBrowserArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCategoryArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteDeviceMakerArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteDeviceModelArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteFormatArgs = {
  ID?: Scalars['ID64']['input'];
  codename?: Scalars['String']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteOsArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteRtbAccessPointArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteRtbSourceArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteZoneArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDisconnectSocialAccountArgs = {
  id: Scalars['ID64']['input'];
};


export type MutationGenerateDirectAccessTokenArgs = {
  description?: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['Time']['input']>;
  userID?: InputMaybe<Scalars['ID64']['input']>;
};


export type MutationInviteAccountMemberArgs = {
  accountID: Scalars['ID64']['input'];
  member: InviteMemberInput;
};


export type MutationLoginArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationPauseAdCampaignArgs = {
  ID: Scalars['ID64']['input'];
};


export type MutationPauseApplicationArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPauseRtbAccessPointArgs = {
  ID: Scalars['ID64']['input'];
};


export type MutationPauseRtbSourceArgs = {
  ID: Scalars['ID64']['input'];
};


export type MutationRegisterAccountArgs = {
  input: AccountCreateInput;
};


export type MutationRejectAccountArgs = {
  id: Scalars['ID64']['input'];
  msg: Scalars['String']['input'];
};


export type MutationRejectAccountMemberArgs = {
  memberID: Scalars['ID64']['input'];
  msg?: Scalars['String']['input'];
};


export type MutationRejectAdCampaignArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRejectApplicationArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRejectRtbAccessPointArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRejectRtbSourceArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRejectUserArgs = {
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRejectZoneArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveAccountMemberArgs = {
  memberID: Scalars['ID64']['input'];
};


export type MutationResetUserPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationRevokeDirectAccessTokenArgs = {
  filter: DirectAccessTokenListFilter;
};


export type MutationRunAdCampaignArgs = {
  ID: Scalars['ID64']['input'];
};


export type MutationRunApplicationArgs = {
  ID: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRunRtbAccessPointArgs = {
  ID: Scalars['ID64']['input'];
};


export type MutationRunRtbSourceArgs = {
  ID: Scalars['ID64']['input'];
};


export type MutationSetOptionArgs = {
  input: OptionInput;
  name: Scalars['String']['input'];
};


export type MutationSwitchAccountArgs = {
  id: Scalars['ID64']['input'];
};


export type MutationUpdateAccountArgs = {
  id: Scalars['ID64']['input'];
  input: AccountInput;
};


export type MutationUpdateAccountMemberArgs = {
  member: MemberInput;
  memberID: Scalars['ID64']['input'];
};


export type MutationUpdateAdCampaignArgs = {
  ID: Scalars['ID64']['input'];
  input: AdCampaignInput;
};


export type MutationUpdateApplicationArgs = {
  ID: Scalars['ID64']['input'];
  input: ApplicationInput;
};


export type MutationUpdateAuthClientArgs = {
  id: Scalars['ID']['input'];
  input: AuthClientInput;
};


export type MutationUpdateBrowserArgs = {
  ID: Scalars['ID64']['input'];
  input: BrowserInput;
};


export type MutationUpdateCategoryArgs = {
  ID: Scalars['ID64']['input'];
  input: CategoryInput;
};


export type MutationUpdateDeviceMakerArgs = {
  ID: Scalars['ID64']['input'];
  input: DeviceMakerInput;
};


export type MutationUpdateDeviceModelArgs = {
  ID: Scalars['ID64']['input'];
  input: DeviceModelInput;
};


export type MutationUpdateFormatArgs = {
  ID: Scalars['ID64']['input'];
  input: AdFormatInput;
};


export type MutationUpdateOsArgs = {
  ID: Scalars['ID64']['input'];
  input: OsInput;
};


export type MutationUpdateRtbAccessPointArgs = {
  ID: Scalars['ID64']['input'];
  input: RtbAccessPointInput;
};


export type MutationUpdateRtbSourceArgs = {
  ID: Scalars['ID64']['input'];
  input: RtbSourceInput;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID64']['input'];
  input: RbacRoleInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID64']['input'];
  input: UserInput;
};


export type MutationUpdateUserPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateZoneArgs = {
  ID: Scalars['ID64']['input'];
  input: ZoneInput;
};

/** OS model schema */
export type Os = {
  __typename?: 'OS';
  /** OS ID */
  ID: Scalars['ID64']['output'];
  /** Active status of the OS */
  active: ActiveStatus;
  /** Creation time of the OS */
  createdAt: Scalars['Time']['output'];
  /** Deletion time of the OS */
  deletedAt?: Maybe<Scalars['Time']['output']>;
  /** Description of the OS */
  description: Scalars['String']['output'];
  /** Expression to match the OS */
  matchExp: Scalars['String']['output'];
  /** Name of the OS */
  name: Scalars['String']['output'];
  /** Last update time of the OS */
  updatedAt: Scalars['Time']['output'];
  /** List of OS versions */
  versions?: Maybe<Array<OsVersion>>;
};

export type OsConnection = {
  __typename?: 'OSConnection';
  /** Edges of OS objects */
  edges?: Maybe<Array<OsEdge>>;
  /** List of OS objects */
  list?: Maybe<Array<Os>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
  /** Total count of OS objects */
  totalCount: Scalars['Int']['output'];
};

export type OsEdge = {
  __typename?: 'OSEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The OS at the end of the edge */
  node: Os;
};

/** Input for querying OS */
export type OsInput = {
  /** Active status of the OS */
  active?: InputMaybe<ActiveStatus>;
  /** Description of the OS */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Expression to match the OS */
  matchExp?: InputMaybe<Scalars['String']['input']>;
  /** Name of the OS */
  name?: InputMaybe<Scalars['String']['input']>;
  /** List of OS versions */
  versions?: InputMaybe<Array<OsVersionInput>>;
};

export type OsListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  active?: InputMaybe<Array<ActiveStatus>>;
  maxVersion?: InputMaybe<Scalars['String']['input']>;
  minVersion?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type OsListOrder = {
  ID?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

export type OsPayload = {
  __typename?: 'OSPayload';
  /** The OS object accessible by a client. */
  OS: Os;
  /** The OS that was created by this mutation. */
  OSID: Scalars['ID64']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

/** OSVersion model schema */
export type OsVersion = {
  __typename?: 'OSVersion';
  /** Maximum version */
  max: Scalars['String']['output'];
  /** Minimum version */
  min: Scalars['String']['output'];
  /** Name of the version */
  name: Scalars['String']['output'];
};

/** Input for OS versions */
export type OsVersionInput = {
  /** Maximum version */
  max?: InputMaybe<Scalars['String']['input']>;
  /** Minimum version */
  min?: InputMaybe<Scalars['String']['input']>;
  /** Name of the version */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Option type definition represents a single option of the user or the system. */
export type Option = {
  __typename?: 'Option';
  name: Scalars['String']['output'];
  optionType: OptionType;
  targetID: Scalars['ID64']['output'];
  value?: Maybe<Scalars['NullableJSON']['output']>;
};

/** The connection type for Option. */
export type OptionConnection = {
  __typename?: 'OptionConnection';
  /** A list of edges. */
  edges: Array<OptionEdge>;
  /** A list of options. */
  list: Array<Option>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of campaigns */
  totalCount: Scalars['Int']['output'];
};

/** The edge type for Option. */
export type OptionEdge = {
  __typename?: 'OptionEdge';
  cursor: Scalars['String']['output'];
  node: Option;
};

export type OptionInput = {
  /** The type of the option. */
  optionType: OptionType;
  /** The target ID of the option. */
  targetID: Scalars['ID64']['input'];
  /** Value of the option. */
  value?: InputMaybe<Scalars['NullableJSON']['input']>;
};

export type OptionListFilter = {
  name?: InputMaybe<Array<Scalars['String']['input']>>;
  namePattern?: InputMaybe<Array<Scalars['String']['input']>>;
  optionType?: InputMaybe<Array<OptionType>>;
  targetID?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

export type OptionListOrder = {
  name?: InputMaybe<Ordering>;
  optionType?: InputMaybe<Ordering>;
  targetID?: InputMaybe<Ordering>;
  value?: InputMaybe<Ordering>;
};

export type OptionPayload = {
  __typename?: 'OptionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Scalars['String']['output'];
  option?: Maybe<Option>;
  optionName: Scalars['String']['output'];
};

export enum OptionType {
  Account = 'ACCOUNT',
  System = 'SYSTEM',
  Undefined = 'UNDEFINED',
  User = 'USER'
}

/** Constants of the order of data */
export enum Ordering {
  /** Ascending ordering of data */
  Asc = 'ASC',
  /** Descending ordering of data */
  Desc = 'DESC'
}

/** Information for paginating */
export type Page = {
  /** Start after the cursor ID */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start after some records */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum number of items to return */
  size?: InputMaybe<Scalars['Int']['input']>;
  /** Page number to start at (0-based), defaults to 0 (0, 1, 2, etc.) */
  startPage?: InputMaybe<Scalars['Int']['input']>;
};

/** Information for paginating */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of pages */
  count: Scalars['Int']['output'];
  /** When paginating forwards, the cursor to continue. */
  endCursor: Scalars['String']['output'];
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Current page number */
  page: Scalars['Int']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Scalars['String']['output'];
  /** Total number of pages available */
  total: Scalars['Int']['output'];
};

export enum PlatformType {
  Desktop = 'DESKTOP',
  GameStation = 'GAME_STATION',
  Mobile = 'MOBILE',
  SmartBillboard = 'SMART_BILLBOARD',
  SmartGlasses = 'SMART_GLASSES',
  SmartPhone = 'SMART_PHONE',
  SmartTv = 'SMART_TV',
  SmartWatch = 'SMART_WATCH',
  Tablet = 'TABLET',
  Undefined = 'UNDEFINED',
  Vr = 'VR',
  Web = 'WEB'
}

export enum PrivateStatus {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Profile = {
  __typename?: 'Profile';
  ID: Scalars['ID64']['output'];
  about: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  messgangers?: Maybe<Array<ProfileMessanger>>;
  updatedAt: Scalars['Time']['output'];
  user: User;
};

export type ProfileMessanger = {
  __typename?: 'ProfileMessanger';
  address: Scalars['String']['output'];
  mtype: MessangerType;
};

export type Query = {
  __typename?: 'Query';
  OS?: Maybe<OsPayload>;
  /** Get RTBAccessPoint object by ID. */
  RTBAccessPoint: RtbAccessPointPayload;
  /** Get RTBSource object by ID */
  RTBSource: RtbSourcePayload;
  /** Get account object by ID */
  account: AccountPayload;
  /** Get AdCampaign object by ID */
  adCampaign: AdCampaignPayload;
  /** Get Application object by ID */
  application: ApplicationPayload;
  /** Get auth client object by ID */
  authClient: AuthClientPayload;
  balance?: Maybe<Balance>;
  browser?: Maybe<BrowserPayload>;
  cancel: StatusResponse;
  category?: Maybe<CategoryPayload>;
  /**
   * Check if the user has access to the particular role or permission.
   * Returns the area of the access or null if access is denied.
   */
  checkPermission?: Maybe<Scalars['String']['output']>;
  /** List of continents */
  continents?: Maybe<Array<Continent>>;
  /** List of countries */
  countries?: Maybe<Array<Country>>;
  credit?: Maybe<Transaction>;
  /** Current account from the session */
  currentAccount: AccountPayload;
  /** Current session from the token */
  currentSession: SessionToken;
  /** Get the current user's social accounts */
  currentSocialAccounts: SocialAccountConnection;
  /** Current user from the session */
  currentUser: UserPayload;
  deduction?: Maybe<Transaction>;
  /** Get device maker by ID */
  deviceMaker?: Maybe<DeviceMakerPayload>;
  /** Get device model by ID */
  deviceModel?: Maybe<DeviceModelPayload>;
  execute: StatusResponse;
  format?: Maybe<AdFormatPayload>;
  /** Get a DirectAccessToken by its ID */
  getDirectAccessToken?: Maybe<DirectAccessTokenPayload>;
  /** List of the account roles/permissions */
  listAccountRolesAndPermissions?: Maybe<RbacRoleConnection>;
  /** List of the account objects which can be filtered and ordered by some fields */
  listAccounts?: Maybe<AccountConnection>;
  /** List of the campaign objects which can be filtered and ordered by some fields */
  listAdCampaigns?: Maybe<AdCampaignConnection>;
  /** List of the application objects which can be filtered and ordered by some fields */
  listApplications?: Maybe<ApplicationConnection>;
  /** List of the auth client objects which can be filtered and ordered by some fields */
  listAuthClients?: Maybe<AuthClientConnection>;
  /** List of browsers */
  listBrowsers?: Maybe<BrowserConnection>;
  /** List of categories */
  listCategories?: Maybe<CategoryConnection>;
  /** List of device makers */
  listDeviceMakers?: Maybe<DeviceMakerConnection>;
  /** List of device models */
  listDeviceModels?: Maybe<DeviceModelConnection>;
  /** List of device types */
  listDeviceTypes?: Maybe<Array<DeviceType>>;
  /** List DirectAccessTokens */
  listDirectAccessTokens?: Maybe<DirectAccessTokenConnection>;
  /** List of ad formats */
  listFormats?: Maybe<AdFormatConnection>;
  /** List of the history actions which can be filtered and ordered by some fields */
  listHistory?: Maybe<HistoryActionConnection>;
  listMembers?: Maybe<MemberConnection>;
  /** List of the RBAC permissions for the current user */
  listMyPermissions?: Maybe<Array<RbacPermission>>;
  /** List of OS */
  listOS?: Maybe<OsConnection>;
  /** List of the option values which can be filtered and ordered by some fields */
  listOptions?: Maybe<OptionConnection>;
  /** List of the RBAC permissions */
  listPermissions?: Maybe<Array<RbacPermission>>;
  /** List of RTBAccessPoint objects which can be filtered and ordered by some fields. */
  listRTBAccessPoints?: Maybe<RtbAccessPointConnection>;
  /** List of the tag objects which can be filtered and ordered by some fields */
  listRTBSources?: Maybe<RtbSourceConnection>;
  /** List of the RBAC role objects which can be filtered and ordered by some fields */
  listRoles?: Maybe<RbacRoleConnection>;
  /** List all social accounts */
  listSocialAccounts: SocialAccountConnection;
  listTransactions?: Maybe<TransactionConnection>;
  /** List of the user objects which can be filtered and ordered by some fields */
  listUsers?: Maybe<UserConnection>;
  /** List of the Zone objects which can be filtered and ordered by some fields */
  listZones?: Maybe<ZoneConnection>;
  /** Get the option value by name */
  option: OptionPayload;
  /** Get RBAC role object by ID */
  role: RbacRolePayload;
  serviceVersion: Scalars['String']['output'];
  setExecutionError: StatusResponse;
  /** Get a social account by its unique identifier */
  socialAccount: SocialAccountPayload;
  /** Get a list of StatisticAdItem objects. */
  statisticAdList: StatisticAdItemConnection;
  topUp?: Maybe<Transaction>;
  /** Get user object by ID or username */
  user: UserPayload;
  withdrawal?: Maybe<Transaction>;
  /** Get Zone object by ID */
  zone: ZonePayload;
};


export type QueryOsArgs = {
  ID?: Scalars['ID64']['input'];
};


export type QueryRtbAccessPointArgs = {
  ID: Scalars['ID64']['input'];
};


export type QueryRtbSourceArgs = {
  ID: Scalars['ID64']['input'];
};


export type QueryAccountArgs = {
  id: Scalars['ID64']['input'];
};


export type QueryAdCampaignArgs = {
  ID: Scalars['ID64']['input'];
};


export type QueryApplicationArgs = {
  ID: Scalars['ID64']['input'];
};


export type QueryAuthClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBalanceArgs = {
  key: Scalars['String']['input'];
};


export type QueryBrowserArgs = {
  ID?: Scalars['ID64']['input'];
};


export type QueryCancelArgs = {
  input: ChangeTransactionStatusRequest;
};


export type QueryCategoryArgs = {
  ID: Scalars['ID64']['input'];
};


export type QueryCheckPermissionArgs = {
  idKey?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  targetID?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCreditArgs = {
  input: CreateTransactionRequest;
};


export type QueryCurrentSocialAccountsArgs = {
  filter?: InputMaybe<SocialAccountListFilter>;
  order?: InputMaybe<SocialAccountListOrder>;
};


export type QueryDeductionArgs = {
  input: CreateTransactionRequest;
};


export type QueryDeviceMakerArgs = {
  ID: Scalars['ID64']['input'];
};


export type QueryDeviceModelArgs = {
  ID: Scalars['ID64']['input'];
};


export type QueryExecuteArgs = {
  input: ChangeTransactionStatusRequest;
};


export type QueryFormatArgs = {
  ID?: Scalars['ID64']['input'];
  codename?: Scalars['String']['input'];
};


export type QueryGetDirectAccessTokenArgs = {
  id: Scalars['ID64']['input'];
};


export type QueryListAccountRolesAndPermissionsArgs = {
  accountID: Scalars['ID64']['input'];
  order?: InputMaybe<RbacRoleListOrder>;
};


export type QueryListAccountsArgs = {
  filter?: InputMaybe<AccountListFilter>;
  order?: InputMaybe<AccountListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListAdCampaignsArgs = {
  filter?: InputMaybe<AdCampaignListFilter>;
  order?: InputMaybe<AdCampaignListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListApplicationsArgs = {
  filter?: InputMaybe<ApplicationListFilter>;
  order?: InputMaybe<ApplicationListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListAuthClientsArgs = {
  filter?: InputMaybe<AuthClientListFilter>;
  order?: InputMaybe<AuthClientListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListBrowsersArgs = {
  filter?: InputMaybe<BrowserListFilter>;
  order?: InputMaybe<BrowserListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListCategoriesArgs = {
  filter?: InputMaybe<CategoryListFilter>;
  order?: InputMaybe<CategoryListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListDeviceMakersArgs = {
  filter?: InputMaybe<DeviceMakerListFilter>;
  order?: InputMaybe<DeviceMakerListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListDeviceModelsArgs = {
  filter?: InputMaybe<DeviceModelListFilter>;
  order?: InputMaybe<DeviceModelListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListDirectAccessTokensArgs = {
  filter?: InputMaybe<DirectAccessTokenListFilter>;
  order?: InputMaybe<DirectAccessTokenListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListFormatsArgs = {
  filter?: InputMaybe<AdFormatListFilter>;
  order?: InputMaybe<AdFormatListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListHistoryArgs = {
  filter?: InputMaybe<HistoryActionListFilter>;
  order?: InputMaybe<HistoryActionListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListMembersArgs = {
  filter?: InputMaybe<MemberListFilter>;
  order?: InputMaybe<MemberListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListMyPermissionsArgs = {
  patterns?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryListOsArgs = {
  filter?: InputMaybe<OsListFilter>;
  order?: InputMaybe<OsListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListOptionsArgs = {
  filter?: InputMaybe<OptionListFilter>;
  order?: InputMaybe<OptionListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListPermissionsArgs = {
  patterns?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryListRtbAccessPointsArgs = {
  filter?: InputMaybe<RtbAccessPointListFilter>;
  order?: InputMaybe<RtbAccessPointListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListRtbSourcesArgs = {
  filter?: InputMaybe<RtbSourceListFilter>;
  order?: InputMaybe<RtbSourceListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListRolesArgs = {
  filter?: InputMaybe<RbacRoleListFilter>;
  order?: InputMaybe<RbacRoleListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListSocialAccountsArgs = {
  filter?: InputMaybe<SocialAccountListFilter>;
  order?: InputMaybe<SocialAccountListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListTransactionsArgs = {
  filter?: InputMaybe<TransactionListFilter>;
  order?: InputMaybe<TransactionListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListUsersArgs = {
  filter?: InputMaybe<UserListFilter>;
  order?: InputMaybe<UserListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryListZonesArgs = {
  filter?: InputMaybe<ZoneListFilter>;
  order?: InputMaybe<ZoneListOrder>;
  page?: InputMaybe<Page>;
};


export type QueryOptionArgs = {
  name: Scalars['String']['input'];
  optionType: OptionType;
  targetID?: Scalars['ID64']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['ID64']['input'];
};


export type QuerySetExecutionErrorArgs = {
  input: ChangeTransactionStatusRequest;
};


export type QuerySocialAccountArgs = {
  id: Scalars['ID64']['input'];
};


export type QueryStatisticAdListArgs = {
  filter?: InputMaybe<StatisticAdListFilter>;
  group: Array<StatisticKey>;
  order?: InputMaybe<Array<StatisticAdKeyOrder>>;
  page?: InputMaybe<Page>;
};


export type QueryTopUpArgs = {
  input: CreateTransactionRequest;
};


export type QueryUserArgs = {
  id?: Scalars['ID64']['input'];
  username?: Scalars['String']['input'];
};


export type QueryWithdrawalArgs = {
  input: CreateTransactionRequest;
};


export type QueryZoneArgs = {
  ID: Scalars['ID64']['input'];
};

export type RbacPermission = {
  __typename?: 'RBACPermission';
  access: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fullname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  object: Scalars['String']['output'];
};

/** A role is a collection of permissions. A role can be a child of another role. */
export type RbacRole = {
  __typename?: 'RBACRole';
  ID: Scalars['ID64']['output'];
  childRoles?: Maybe<Array<RbacRole>>;
  /**
   *  Context is a JSON object that defines the context of the role.
   *  The context is used to determine whether the role is applicable to the object.
   *  The context is a JSON object with the following structure:
   *
   * {"cover": "system", "object": "role"}
   *
   *  where:
   * "cover" - is a name of the cover area of the object type
   * "object" - is a name of the object type <module>:<object-name>
   */
  context?: Maybe<Scalars['NullableJSON']['output']>;
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissionPatterns?: Maybe<Array<Scalars['String']['output']>>;
  permissions?: Maybe<Array<RbacPermission>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

/** RBACRoleConnection implements collection accessor interface with pagination. */
export type RbacRoleConnection = {
  __typename?: 'RBACRoleConnection';
  /** The edges for each of the RBACRoles's lists */
  edges?: Maybe<Array<RbacRoleEdge>>;
  /** A list of the RBACRoles, as a convenience when edges are not needed. */
  list?: Maybe<Array<RbacRole>>;
  /** Information for paginating this connection */
  pageInfo: PageInfo;
  /** The total number of campaigns */
  totalCount: Scalars['Int']['output'];
};

/** RBACRoleEdge is a connection edge type for RBACRole. */
export type RbacRoleEdge = {
  __typename?: 'RBACRoleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<RbacRole>;
};

export type RbacRoleInput = {
  context?: InputMaybe<Scalars['NullableJSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RbacRoleListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  name?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RbacRoleListOrder = {
  ID?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
};

/** RBACRolePayload wrapper to access of RBACRole oprtation results */
export type RbacRolePayload = {
  __typename?: 'RBACRolePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** Role object accessor */
  role?: Maybe<RbacRole>;
  /** Role ID operation result */
  roleID: Scalars['ID64']['output'];
};

/** RTBAccessPoint object represents an access point for DSP connections. */
export type RtbAccessPoint = {
  __typename?: 'RTBAccessPoint';
  ID: Scalars['ID64']['output'];
  IP: AnyIPv4IPv6;
  OS?: Maybe<Array<Scalars['Int64']['output']>>;
  RPS: Scalars['Int']['output'];
  accountID: Scalars['ID64']['output'];
  /** Active status of the access point. */
  active: ActiveStatus;
  adBlock: AnyOnlyExclude;
  applications?: Maybe<Array<Scalars['Int64']['output']>>;
  auctionType: AuctionType;
  browsers?: Maybe<Array<Scalars['Int64']['output']>>;
  carriers?: Maybe<Array<Scalars['Int64']['output']>>;
  categories?: Maybe<Array<Scalars['Int64']['output']>>;
  codename: Scalars['String']['output'];
  countries?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  description: Scalars['String']['output'];
  deviceTypes?: Maybe<Array<Scalars['Int64']['output']>>;
  devices?: Maybe<Array<Scalars['Int64']['output']>>;
  domainDefault: Scalars['String']['output'];
  domains?: Maybe<Array<Scalars['String']['output']>>;
  fixedPurchasePrice: Scalars['Float']['output'];
  /** Flags for the access point. */
  flags: Scalars['NullableJSON']['output'];
  formats?: Maybe<Array<Scalars['String']['output']>>;
  headers: Scalars['NullableJSON']['output'];
  languages?: Maybe<Array<Scalars['String']['output']>>;
  maxBid: Scalars['Float']['output'];
  privateBrowsing: AnyOnlyExclude;
  protocol: Scalars['String']['output'];
  requestType: RtbRequestFormatType;
  /** Revenue share reduce factor to account for discrepancies. */
  revenueShareReduce?: Maybe<Scalars['Float']['output']>;
  secure: AnyOnlyExclude;
  sources?: Maybe<Array<Scalars['Int64']['output']>>;
  /** Approval status of the access point. */
  status: ApproveStatus;
  timeout: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  zones?: Maybe<Array<Scalars['Int64']['output']>>;
};

/** RTBAccessPointConnection wrapper to access RTBAccessPoint objects. */
export type RtbAccessPointConnection = {
  __typename?: 'RTBAccessPointConnection';
  /** Edges of RTBAccessPoint objects. */
  edges: Array<RtbAccessPointEdge>;
  /** List of RTBAccessPoint objects. */
  list: Array<RtbAccessPoint>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of RTBAccessPoint objects. */
  totalCount: Scalars['Int']['output'];
};

/** RTBAccessPointEdge wrapper to access RTBAccessPoint objects. */
export type RtbAccessPointEdge = {
  __typename?: 'RTBAccessPointEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The RTBAccessPoint at the end of RTBAccessPointEdge. */
  node: RtbAccessPoint;
};

export type RtbAccessPointInput = {
  IP?: InputMaybe<AnyIPv4IPv6>;
  OS?: InputMaybe<Array<Scalars['Int64']['input']>>;
  RPS?: InputMaybe<Scalars['Int']['input']>;
  accountID?: InputMaybe<Scalars['ID64']['input']>;
  adBlock?: InputMaybe<AnyOnlyExclude>;
  applications?: InputMaybe<Array<Scalars['Int64']['input']>>;
  auctionType?: InputMaybe<AuctionType>;
  browsers?: InputMaybe<Array<Scalars['Int64']['input']>>;
  carriers?: InputMaybe<Array<Scalars['Int64']['input']>>;
  categories?: InputMaybe<Array<Scalars['Int64']['input']>>;
  codename?: InputMaybe<Scalars['String']['input']>;
  countries?: InputMaybe<Array<Scalars['String']['input']>>;
  createdAt?: InputMaybe<Scalars['Time']['input']>;
  deletedAt?: InputMaybe<Scalars['Time']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  deviceTypes?: InputMaybe<Array<Scalars['Int64']['input']>>;
  devices?: InputMaybe<Array<Scalars['Int64']['input']>>;
  domainDefault?: InputMaybe<Scalars['String']['input']>;
  domains?: InputMaybe<Array<Scalars['String']['input']>>;
  fixedPurchasePrice?: InputMaybe<Scalars['Float']['input']>;
  /** Flags for the access point. */
  flags?: InputMaybe<Scalars['NullableJSON']['input']>;
  formats?: InputMaybe<Array<Scalars['String']['input']>>;
  headers?: InputMaybe<Scalars['NullableJSON']['input']>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  maxBid?: InputMaybe<Scalars['Float']['input']>;
  privateBrowsing?: InputMaybe<AnyOnlyExclude>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  requestType?: InputMaybe<RtbRequestFormatType>;
  /** Revenue share reduce factor to account for discrepancies. */
  revenueShareReduce?: InputMaybe<Scalars['Float']['input']>;
  secure?: InputMaybe<AnyOnlyExclude>;
  sources?: InputMaybe<Array<Scalars['Int64']['input']>>;
  /** Timeout for the request in milliseconds */
  timeout?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Time']['input']>;
  zones?: InputMaybe<Array<Scalars['Int64']['input']>>;
};

export type RtbAccessPointListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  accountID?: InputMaybe<Scalars['ID64']['input']>;
};

export type RtbAccessPointListOrder = {
  ID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  deletedAt?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** RTBAccessPointPayload wrapper to access RTBAccessPoint operation results. */
export type RtbAccessPointPayload = {
  __typename?: 'RTBAccessPointPayload';
  /** The RTBAccessPoint object accessible by a client. */
  accessPoint: RtbAccessPoint;
  /** The RTBAccessPoint that was created by this mutation. */
  accessPointID: Scalars['ID64']['output'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
};

export enum RtbRequestFormatType {
  Json = 'JSON',
  Undefined = 'UNDEFINED',
  Xml = 'XML'
}

/** RTBSource object represents a source of RTB advertising */
export type RtbSource = {
  __typename?: 'RTBSource';
  ID: Scalars['ID64']['output'];
  IP: AnyIPv4IPv6;
  OS?: Maybe<Array<Scalars['Int64']['output']>>;
  RPS: Scalars['Int']['output'];
  /** After approval URL can't be changed */
  URL: Scalars['String']['output'];
  accountID: Scalars['ID64']['output'];
  accuracy: Scalars['Float']['output'];
  /** Active status of source */
  active: ActiveStatus;
  adBlock: AnyOnlyExclude;
  applications?: Maybe<Array<Scalars['Int64']['output']>>;
  auctionType: AuctionType;
  browsers?: Maybe<Array<Scalars['Int64']['output']>>;
  carriers?: Maybe<Array<Scalars['Int64']['output']>>;
  categories?: Maybe<Array<Scalars['Int64']['output']>>;
  config: Scalars['NullableJSON']['output'];
  countries?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  description: Scalars['String']['output'];
  deviceTypes?: Maybe<Array<Scalars['Int64']['output']>>;
  devices?: Maybe<Array<Scalars['Int64']['output']>>;
  domains?: Maybe<Array<Scalars['String']['output']>>;
  /** Flags of source */
  flags: Scalars['NullableJSON']['output'];
  formats?: Maybe<Array<Scalars['String']['output']>>;
  headers: Scalars['NullableJSON']['output'];
  languages?: Maybe<Array<Scalars['String']['output']>>;
  maxBid: Scalars['Float']['output'];
  method: Scalars['String']['output'];
  minBid: Scalars['Float']['output'];
  minimalWeight: Scalars['Float']['output'];
  priceCorrectionReduce: Scalars['Float']['output'];
  privateBrowsing: AnyOnlyExclude;
  protocol: Scalars['String']['output'];
  requestType: RtbRequestFormatType;
  secure: AnyOnlyExclude;
  /** Status of source approval */
  status: ApproveStatus;
  timeout: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  zones?: Maybe<Array<Scalars['Int64']['output']>>;
};

/** RTBSourceConnection wrapper to access of RTBSource objects */
export type RtbSourceConnection = {
  __typename?: 'RTBSourceConnection';
  /** Edges of RTBSource objects */
  edges: Array<RtbSourceEdge>;
  /** List of RTBSource objects */
  list: Array<RtbSource>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of RTBSource objects */
  totalCount: Scalars['Int']['output'];
};

/** RTBSourceEdge wrapper to access of RTBSource objects */
export type RtbSourceEdge = {
  __typename?: 'RTBSourceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The RTBSource at the end of RTBSourceEdge. */
  node: RtbSource;
};

export type RtbSourceInput = {
  IP?: InputMaybe<AnyIPv4IPv6>;
  OS?: InputMaybe<Array<Scalars['Int64']['input']>>;
  RPS?: InputMaybe<Scalars['Int']['input']>;
  /** After approval URL can't be changed */
  URL?: InputMaybe<Scalars['String']['input']>;
  accountID?: InputMaybe<Scalars['ID64']['input']>;
  accuracy?: InputMaybe<Scalars['Float']['input']>;
  adBlock?: InputMaybe<AnyOnlyExclude>;
  applications?: InputMaybe<Array<Scalars['Int64']['input']>>;
  auctionType?: InputMaybe<AuctionType>;
  browsers?: InputMaybe<Array<Scalars['Int64']['input']>>;
  carriers?: InputMaybe<Array<Scalars['Int64']['input']>>;
  categories?: InputMaybe<Array<Scalars['Int64']['input']>>;
  config?: InputMaybe<Scalars['NullableJSON']['input']>;
  countries?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  deviceTypes?: InputMaybe<Array<Scalars['Int64']['input']>>;
  devices?: InputMaybe<Array<Scalars['Int64']['input']>>;
  domains?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Flags of source */
  flags?: InputMaybe<Scalars['NullableJSON']['input']>;
  formats?: InputMaybe<Array<Scalars['String']['input']>>;
  headers?: InputMaybe<Scalars['NullableJSON']['input']>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  maxBid?: InputMaybe<Scalars['Float']['input']>;
  method?: InputMaybe<Scalars['String']['input']>;
  minBid?: InputMaybe<Scalars['Float']['input']>;
  minimalWeight?: InputMaybe<Scalars['Float']['input']>;
  priceCorrectionReduce?: InputMaybe<Scalars['Float']['input']>;
  privateBrowsing?: InputMaybe<AnyOnlyExclude>;
  protocol?: InputMaybe<Scalars['String']['input']>;
  requestType?: InputMaybe<RtbRequestFormatType>;
  secure?: InputMaybe<AnyOnlyExclude>;
  timeout?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  zones?: InputMaybe<Array<Scalars['Int64']['input']>>;
};

export type RtbSourceListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  accountID?: InputMaybe<Scalars['ID64']['input']>;
};

export type RtbSourceListOrder = {
  ID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  deletedAt?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** RTBSourcePayload wrapper to access of RTBSource oprtation results */
export type RtbSourcePayload = {
  __typename?: 'RTBSourcePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** The RTBSource object accessible by a client. */
  source: RtbSource;
  /** The RTBSource that was created by this mutation. */
  sourceID: Scalars['ID64']['output'];
};

/** Constants of the response status */
export enum ResponseStatus {
  /** Error status of the response */
  Error = 'ERROR',
  /** Success status of the response */
  Success = 'SUCCESS'
}

/** SessionToken object represents an OAuth 2.0 / JWT session token */
export type SessionToken = {
  __typename?: 'SessionToken';
  expiresAt: Scalars['Time']['output'];
  isAdmin: Scalars['Boolean']['output'];
  roles?: Maybe<Array<Scalars['String']['output']>>;
  token: Scalars['String']['output'];
};

export type SocialAccount = {
  __typename?: 'SocialAccount';
  ID: Scalars['ID64']['output'];
  avatar: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  data: Scalars['NullableJSON']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  link: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  /** Social Account session object accessor */
  sessions?: Maybe<Array<SocialAccountSession>>;
  socialID: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  userID: Scalars['ID64']['output'];
  username: Scalars['String']['output'];
};

/** SocialAccountConnection implements collection accessor interface with pagination */
export type SocialAccountConnection = {
  __typename?: 'SocialAccountConnection';
  /** The edges for each of the social account's lists */
  edges?: Maybe<Array<SocialAccountEdge>>;
  /** A list of the social accounts, as a convenience when edges are not needed. */
  list?: Maybe<Array<SocialAccount>>;
  /** Information for paginating this connection */
  pageInfo: PageInfo;
  /** The total number of records */
  totalCount: Scalars['Int']['output'];
};

export type SocialAccountEdge = {
  __typename?: 'SocialAccountEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<SocialAccount>;
};

export type SocialAccountListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  email?: InputMaybe<Array<Scalars['String']['input']>>;
  provider?: InputMaybe<Array<Scalars['String']['input']>>;
  userID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  username?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SocialAccountListOrder = {
  ID?: InputMaybe<Ordering>;
  email?: InputMaybe<Ordering>;
  firstName?: InputMaybe<Ordering>;
  lastName?: InputMaybe<Ordering>;
  provider?: InputMaybe<Ordering>;
  userID?: InputMaybe<Ordering>;
  username?: InputMaybe<Ordering>;
};

/** SocialAccountPayload wrapper to access of SocialAccount oprtation results */
export type SocialAccountPayload = {
  __typename?: 'SocialAccountPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** Social Account object accessor */
  socialAccount?: Maybe<SocialAccount>;
  /** Social Account ID operation result */
  socialAccountID: Scalars['ID64']['output'];
};

export type SocialAccountSession = {
  __typename?: 'SocialAccountSession';
  accessToken: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  expiresAt?: Maybe<Scalars['Time']['output']>;
  /** The unique name of the session to destinguish between different sessions with different scopes */
  name: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  scope?: Maybe<Array<Scalars['String']['output']>>;
  socialAccountID: Scalars['ID64']['output'];
  tokenType: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type StatisticAdItem = {
  __typename?: 'StatisticAdItem';
  CTR: Scalars['Float']['output'];
  bidPrice: Scalars['Float']['output'];
  bids: Scalars['Uint64']['output'];
  clicks: Scalars['Uint64']['output'];
  directs: Scalars['Uint64']['output'];
  eCPA: Scalars['Float']['output'];
  eCPC: Scalars['Float']['output'];
  eCPM: Scalars['Float']['output'];
  errors: Scalars['Uint64']['output'];
  impressions: Scalars['Uint64']['output'];
  keys?: Maybe<Array<StatisticItemKey>>;
  leads: Scalars['Uint64']['output'];
  nobids: Scalars['Uint64']['output'];
  profit: Scalars['Float']['output'];
  requests: Scalars['Uint64']['output'];
  skips: Scalars['Uint64']['output'];
  spent: Scalars['Float']['output'];
  views: Scalars['Uint64']['output'];
  wins: Scalars['Uint64']['output'];
};

/** StatisticAdItemConnection is a paginated list of StatisticAdItem objects. */
export type StatisticAdItemConnection = {
  __typename?: 'StatisticAdItemConnection';
  edges: Array<StatisticAdItemEdge>;
  /** List of StatisticAdItem objects. */
  list?: Maybe<Array<StatisticAdItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of StatisticAdItem objects. */
  totalCount: Scalars['Int']['output'];
};

export type StatisticAdItemEdge = {
  __typename?: 'StatisticAdItemEdge';
  next: Scalars['String']['output'];
  node: StatisticAdItem;
};

export type StatisticAdKeyCondition = {
  key: StatisticKey;
  op: StatisticCondition;
  value: Array<Scalars['Any']['input']>;
};

export type StatisticAdKeyOrder = {
  key: StatisticOrderingKey;
  order: Ordering;
};

export type StatisticAdListFilter = {
  conditions?: InputMaybe<Array<StatisticAdKeyCondition>>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum StatisticCondition {
  Bt = 'BT',
  Eq = 'EQ',
  Ge = 'GE',
  Gt = 'GT',
  In = 'IN',
  Le = 'LE',
  Li = 'LI',
  Lt = 'LT',
  Nb = 'NB',
  Ne = 'NE',
  Ni = 'NI',
  Nl = 'NL'
}

export type StatisticItemKey = {
  __typename?: 'StatisticItemKey';
  key: StatisticKey;
  text: Scalars['String']['output'];
  value: Scalars['Any']['output'];
};

export enum StatisticKey {
  AccessPointId = 'ACCESS_POINT_ID',
  AdvAccountId = 'ADV_ACCOUNT_ID',
  AdId = 'AD_ID',
  AppId = 'APP_ID',
  BrowserId = 'BROWSER_ID',
  CampaignId = 'CAMPAIGN_ID',
  CarrierId = 'CARRIER_ID',
  City = 'CITY',
  Cluster = 'CLUSTER',
  Country = 'COUNTRY',
  Datamark = 'DATAMARK',
  DeviceId = 'DEVICE_ID',
  DeviceType = 'DEVICE_TYPE',
  Domain = 'DOMAIN',
  FormatId = 'FORMAT_ID',
  Ip = 'IP',
  JumperId = 'JUMPER_ID',
  Language = 'LANGUAGE',
  OsId = 'OS_ID',
  Platform = 'PLATFORM',
  ProjectId = 'PROJECT_ID',
  PubAccountId = 'PUB_ACCOUNT_ID',
  SourceId = 'SOURCE_ID',
  Timemark = 'TIMEMARK',
  Undefined = 'UNDEFINED',
  ZoneId = 'ZONE_ID'
}

export enum StatisticOrderingKey {
  AccessPointId = 'ACCESS_POINT_ID',
  AdvAccountId = 'ADV_ACCOUNT_ID',
  AdId = 'AD_ID',
  AppId = 'APP_ID',
  Bids = 'BIDS',
  BidPrice = 'BID_PRICE',
  BrowserId = 'BROWSER_ID',
  CampaignId = 'CAMPAIGN_ID',
  CarrierId = 'CARRIER_ID',
  City = 'CITY',
  Clicks = 'CLICKS',
  Cluster = 'CLUSTER',
  Country = 'COUNTRY',
  Ctr = 'CTR',
  Datamark = 'DATAMARK',
  DeviceId = 'DEVICE_ID',
  DeviceType = 'DEVICE_TYPE',
  Directs = 'DIRECTS',
  Domain = 'DOMAIN',
  Ecpa = 'ECPA',
  Ecpc = 'ECPC',
  Ecpm = 'ECPM',
  Errors = 'ERRORS',
  FormatId = 'FORMAT_ID',
  Impressions = 'IMPRESSIONS',
  Ip = 'IP',
  JumperId = 'JUMPER_ID',
  Language = 'LANGUAGE',
  Leads = 'LEADS',
  Nobids = 'NOBIDS',
  OsId = 'OS_ID',
  Platform = 'PLATFORM',
  Profit = 'PROFIT',
  ProjectId = 'PROJECT_ID',
  PubAccountId = 'PUB_ACCOUNT_ID',
  Requests = 'REQUESTS',
  Skips = 'SKIPS',
  SourceId = 'SOURCE_ID',
  Spent = 'SPENT',
  Timemark = 'TIMEMARK',
  Undefined = 'UNDEFINED',
  Views = 'VIEWS',
  Wins = 'WINS',
  ZoneId = 'ZONE_ID'
}

/** Simple response type for the API */
export type StatusResponse = {
  __typename?: 'StatusResponse';
  /** Unique identifier for the client performing the mutation */
  clientMutationID: Scalars['String']['output'];
  /** The message of the response */
  message?: Maybe<Scalars['String']['output']>;
  /** The status of the response */
  status: ResponseStatus;
};

export type TimeZone = {
  __typename?: 'TimeZone';
  lon: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  ID: Scalars['UUID']['output'];
  amount: Scalars['Float']['output'];
  createdAt: Scalars['Time']['output'];
  gatewayID: Scalars['String']['output'];
  gatewayInfo: Scalars['String']['output'];
  gatewayPaymentID: Scalars['String']['output'];
  invoiceID: Scalars['Int64']['output'];
  invoiceNumber: Scalars['String']['output'];
  key: Scalars['String']['output'];
  message: Scalars['String']['output'];
  status: TransactionStatus;
  type: TransactionType;
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  edges: Array<TransactionEdge>;
  list: Array<Transaction>;
  pageInfo: PageInfo;
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  next: Scalars['String']['output'];
  node: Transaction;
};

export type TransactionListFilter = {
  key?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Array<InputMaybe<TransactionType>>>;
};

export type TransactionListOrder = {
  CreatedAt?: InputMaybe<Ordering>;
  GatewayID?: InputMaybe<Ordering>;
  Key?: InputMaybe<Ordering>;
  Type?: InputMaybe<Ordering>;
};

export enum TransactionStatus {
  Cancelled = 'CANCELLED',
  Created = 'CREATED',
  Executed = 'EXECUTED',
  ExecutionError = 'EXECUTION_ERROR',
  Undefined = 'UNDEFINED'
}

export enum TransactionType {
  Credit = 'CREDIT',
  Deduction = 'DEDUCTION',
  PayOffCredit = 'PAY_OFF_CREDIT',
  TopUp = 'TOP_UP',
  Undefined = 'UNDEFINED',
  Withdrawal = 'WITHDRAWAL'
}

/** User represents a user object of the system */
export type User = {
  __typename?: 'User';
  /** The primary key of the user */
  ID: Scalars['ID64']['output'];
  createdAt: Scalars['Time']['output'];
  /** Status of user active */
  status: ApproveStatus;
  /** Message which defined during user approve/rejection process */
  statusMessage?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Time']['output'];
  /** Unical user name */
  username: Scalars['String']['output'];
};

/** UserConnection implements collection accessor interface with pagination. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** The edges for each of the users's lists */
  edges?: Maybe<Array<UserEdge>>;
  /** A list of the users, as a convenience when edges are not needed. */
  list?: Maybe<Array<User>>;
  /** Information for paginating this connection */
  pageInfo: PageInfo;
  /** The total number of campaigns */
  totalCount: Scalars['Int']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

export type UserInput = {
  status?: InputMaybe<ApproveStatus>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** UserListFilter implements filter for user list query */
export type UserListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  accountID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  roles?: InputMaybe<Array<Scalars['ID64']['input']>>;
};

/** UserListOrder implements order for user list query */
export type UserListOrder = {
  ID?: InputMaybe<Ordering>;
  country?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  email?: InputMaybe<Ordering>;
  manager?: InputMaybe<Ordering>;
  registrationDate?: InputMaybe<Ordering>;
  status?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
  username?: InputMaybe<Ordering>;
};

/** UserPayload wrapper to access of user oprtation results */
export type UserPayload = {
  __typename?: 'UserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** User object accessor */
  user?: Maybe<User>;
  /** User ID operation result */
  userID: Scalars['ID64']['output'];
};

/** Zone object represents a specific advertising zone within an account. */
export type Zone = {
  __typename?: 'Zone';
  ID: Scalars['ID64']['output'];
  accountID: Scalars['ID64']['output'];
  /** Active status of the zone */
  active: ActiveStatus;
  allowedFormats?: Maybe<Array<Scalars['String']['output']>>;
  allowedSources?: Maybe<Array<Scalars['Int64']['output']>>;
  allowedTypes?: Maybe<Array<Scalars['Int64']['output']>>;
  campaigns?: Maybe<Array<Scalars['Int64']['output']>>;
  codename: Scalars['String']['output'];
  context: Scalars['NullableJSON']['output'];
  createdAt: Scalars['Time']['output'];
  defaultCode: Scalars['NullableJSON']['output'];
  deletedAt?: Maybe<Scalars['Time']['output']>;
  description: Scalars['String']['output'];
  disallowedSources?: Maybe<Array<Scalars['Int64']['output']>>;
  fixedPurchasePrice: Scalars['Float']['output'];
  minECPM: Scalars['Float']['output'];
  /** Status of the zone */
  status: ApproveStatus;
  title: Scalars['String']['output'];
  type: ZoneType;
  updatedAt: Scalars['Time']['output'];
};

/** ZoneConnection wrapper to access Zone objects */
export type ZoneConnection = {
  __typename?: 'ZoneConnection';
  /** Edges of Zone objects */
  edges?: Maybe<Array<ZoneEdge>>;
  /** List of Zone objects */
  list?: Maybe<Array<Zone>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Total count of Zone objects */
  totalCount: Scalars['Int']['output'];
};

/** ZoneEdge wrapper to access Zone objects */
export type ZoneEdge = {
  __typename?: 'ZoneEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The Zone at the end of ZoneEdge. */
  node: Zone;
};

/** Input type for creating or updating a Zone. */
export type ZoneInput = {
  /** Account ID associated with the Zone. Must have appropriate permissions. */
  accountID?: InputMaybe<Scalars['ID64']['input']>;
  allowedFormats?: InputMaybe<Array<Scalars['String']['input']>>;
  allowedSources?: InputMaybe<Array<Scalars['Int64']['input']>>;
  allowedTypes?: InputMaybe<Array<Scalars['Int64']['input']>>;
  campaigns?: InputMaybe<Array<Scalars['Int64']['input']>>;
  /** Unique codename for the Zone. */
  codename?: InputMaybe<Scalars['String']['input']>;
  context?: InputMaybe<Scalars['JSON']['input']>;
  defaultCode?: InputMaybe<Scalars['JSON']['input']>;
  /** Description of the Zone. */
  description?: InputMaybe<Scalars['String']['input']>;
  disallowedSources?: InputMaybe<Array<Scalars['Int64']['input']>>;
  fixedPurchasePrice?: InputMaybe<Scalars['Float']['input']>;
  minECPM?: InputMaybe<Scalars['Float']['input']>;
  minECPMByGeo?: InputMaybe<Scalars['JSON']['input']>;
  /** Title of the Zone. */
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ZoneType>;
};

/** Filter input for listing Zones. */
export type ZoneListFilter = {
  ID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  accountID?: InputMaybe<Array<Scalars['ID64']['input']>>;
  active?: InputMaybe<ActiveStatus>;
  codename?: InputMaybe<Array<Scalars['String']['input']>>;
  maxECPM?: InputMaybe<Scalars['Float']['input']>;
  minECPM?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ApproveStatus>;
  type?: InputMaybe<ZoneType>;
};

/** Order input for listing Zones. */
export type ZoneListOrder = {
  ID?: InputMaybe<Ordering>;
  accountID?: InputMaybe<Ordering>;
  active?: InputMaybe<Ordering>;
  codename?: InputMaybe<Ordering>;
  createdAt?: InputMaybe<Ordering>;
  minECPM?: InputMaybe<Ordering>;
  status?: InputMaybe<Ordering>;
  title?: InputMaybe<Ordering>;
  type?: InputMaybe<Ordering>;
  updatedAt?: InputMaybe<Ordering>;
};

/** ZonePayload wrapper to access Zone operation results */
export type ZonePayload = {
  __typename?: 'ZonePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationID: Scalars['String']['output'];
  /** The Zone object accessible by a client. */
  zone: Zone;
  /** The Zone that was created or updated by this mutation. */
  zoneID: Scalars['ID64']['output'];
};

/** Enumeration of possible Zone types. */
export enum ZoneType {
  Default = 'DEFAULT',
  SmartLink = 'SMART_LINK'
}

export type __FormatDataFragment = { __typename?: 'AdFormat', ID: any, codename: string, type: string, title: string, description: string, active: ActiveStatus, width: number, height: number, minWidth: number, minHeight: number, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null };

export type ListAdFormatsQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<AdFormatListFilter>;
  order?: InputMaybe<AdFormatListOrder>;
}>;


export type ListAdFormatsQuery = { __typename?: 'Query', result?: { __typename?: 'AdFormatConnection', totalCount: number, list: Array<{ __typename?: 'AdFormat', ID: any, codename: string, type: string, title: string, description: string, active: ActiveStatus, width: number, height: number, minWidth: number, minHeight: number, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type GetAdFormatQueryVariables = Exact<{
  id?: Scalars['ID64']['input'];
  codename?: Scalars['String']['input'];
}>;


export type GetAdFormatQuery = { __typename?: 'Query', result?: { __typename?: 'AdFormatPayload', clientMutationID: string, data: { __typename?: 'AdFormat', ID: any, codename: string, type: string, title: string, description: string, active: ActiveStatus, width: number, height: number, minWidth: number, minHeight: number, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null } } | null };

export type CreateAdFormatMutationVariables = Exact<{
  input: AdFormatInput;
}>;


export type CreateAdFormatMutation = { __typename?: 'Mutation', result?: { __typename?: 'AdFormatPayload', clientMutationID: string, formatID: any, data: { __typename?: 'AdFormat', ID: any, codename: string, type: string, title: string, description: string, active: ActiveStatus, width: number, height: number, minWidth: number, minHeight: number, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null } } | null };

export type UpdateAdFormatMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: AdFormatInput;
}>;


export type UpdateAdFormatMutation = { __typename?: 'Mutation', result?: { __typename?: 'AdFormatPayload', clientMutationID: string, formatID: any, data: { __typename?: 'AdFormat', ID: any, codename: string, type: string, title: string, description: string, active: ActiveStatus, width: number, height: number, minWidth: number, minHeight: number, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null } } | null };

export type __ApplicationDataFragment = { __typename?: 'Application', ID: any, accountID: any, creatorID: any, title: string, description: string, URI: string, type: ApplicationType, platform: PlatformType, premium: boolean, status: ApproveStatus, active: ActiveStatus, categories?: Array<number> | null, revenueShare?: number | null, createdAt: any, updatedAt: any, deletedAt?: any | null };

export type GetApplicationQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetApplicationQuery = { __typename?: 'Query', result: { __typename?: 'ApplicationPayload', clientMutationID: string, data: { __typename?: 'Application', ID: any, accountID: any, creatorID: any, title: string, description: string, URI: string, type: ApplicationType, platform: PlatformType, premium: boolean, status: ApproveStatus, active: ActiveStatus, categories?: Array<number> | null, revenueShare?: number | null, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type ListApplicationsQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<ApplicationListFilter>;
  order?: InputMaybe<ApplicationListOrder>;
}>;


export type ListApplicationsQuery = { __typename?: 'Query', permApprove?: string | null, permReject?: string | null, result?: { __typename?: 'ApplicationConnection', totalCount: number, list: Array<{ __typename?: 'Application', ID: any, accountID: any, creatorID: any, title: string, description: string, URI: string, type: ApplicationType, platform: PlatformType, premium: boolean, status: ApproveStatus, active: ActiveStatus, categories?: Array<number> | null, revenueShare?: number | null, createdAt: any, updatedAt: any, deletedAt?: any | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type CreateApplicationMutationVariables = Exact<{
  input: ApplicationInput;
}>;


export type CreateApplicationMutation = { __typename?: 'Mutation', result: { __typename?: 'ApplicationPayload', clientMutationID: string, applicationID: any, data: { __typename?: 'Application', ID: any, accountID: any, creatorID: any, title: string, description: string, URI: string, type: ApplicationType, platform: PlatformType, premium: boolean, status: ApproveStatus, active: ActiveStatus, categories?: Array<number> | null, revenueShare?: number | null, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type UpdateApplicationMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: ApplicationInput;
}>;


export type UpdateApplicationMutation = { __typename?: 'Mutation', result: { __typename?: 'ApplicationPayload', clientMutationID: string, applicationID: any, data: { __typename?: 'Application', ID: any, accountID: any, creatorID: any, title: string, description: string, URI: string, type: ApplicationType, platform: PlatformType, premium: boolean, status: ApproveStatus, active: ActiveStatus, categories?: Array<number> | null, revenueShare?: number | null, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type DeleteApplicationMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type DeleteApplicationMutation = { __typename?: 'Mutation', result?: { __typename?: 'ApplicationPayload', clientMutationID: string } | null };

export type ApproveApplicationMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type ApproveApplicationMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type RejectApplicationMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type RejectApplicationMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type RunApplicationMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type RunApplicationMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type PauseApplicationMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type PauseApplicationMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type __CategoryDataFragment = { __typename?: 'Category', ID: any, name: string, description: string, IABCode: string, parentID?: any | null, position: number, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, parent?: { __typename?: 'Category', ID: any, name: string } | null };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', result?: { __typename?: 'CategoryPayload', clientMutationID: string, categoryID: any, data: { __typename?: 'Category', ID: any, name: string, description: string, IABCode: string, parentID?: any | null, position: number, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, parent?: { __typename?: 'Category', ID: any, name: string } | null } } | null };

export type ListCategoriesQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<CategoryListFilter>;
  order?: InputMaybe<CategoryListOrder>;
}>;


export type ListCategoriesQuery = { __typename?: 'Query', result?: { __typename?: 'CategoryConnection', list: Array<{ __typename?: 'Category', ID: any, name: string, description: string, IABCode: string, parentID?: any | null, position: number, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, parent?: { __typename?: 'Category', ID: any, name: string } | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type CreateCategoryMutationVariables = Exact<{
  input: CategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', result?: { __typename?: 'CategoryPayload', clientMutationID: string, categoryID: any, data: { __typename?: 'Category', ID: any, name: string, description: string, IABCode: string, parentID?: any | null, position: number, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, parent?: { __typename?: 'Category', ID: any, name: string } | null } } | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: CategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', result?: { __typename?: 'CategoryPayload', clientMutationID: string, categoryID: any, data: { __typename?: 'Category', ID: any, name: string, description: string, IABCode: string, parentID?: any | null, position: number, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, parent?: { __typename?: 'Category', ID: any, name: string } | null } } | null };

export type __OsDataFragment = { __typename?: 'OS', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'OSVersion', name: string, min: string, max: string }> | null };

export type GetOsQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetOsQuery = { __typename?: 'Query', result?: { __typename?: 'OSPayload', clientMutationID: string, data: { __typename?: 'OS', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'OSVersion', name: string, min: string, max: string }> | null } } | null };

export type ListOsQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<OsListFilter>;
  order?: InputMaybe<OsListOrder>;
}>;


export type ListOsQuery = { __typename?: 'Query', result?: { __typename?: 'OSConnection', totalCount: number, list?: Array<{ __typename?: 'OS', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'OSVersion', name: string, min: string, max: string }> | null }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type CreateOsMutationVariables = Exact<{
  input: OsInput;
}>;


export type CreateOsMutation = { __typename?: 'Mutation', result?: { __typename?: 'OSPayload', clientMutationID: string, data: { __typename?: 'OS', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'OSVersion', name: string, min: string, max: string }> | null } } | null };

export type UpdateOsMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: OsInput;
}>;


export type UpdateOsMutation = { __typename?: 'Mutation', result?: { __typename?: 'OSPayload', clientMutationID: string, data: { __typename?: 'OS', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'OSVersion', name: string, min: string, max: string }> | null } } | null };

export type __PageInfoFragment = { __typename?: 'PageInfo', total: number, page: number, count: number };

export type ListCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCountriesQuery = { __typename?: 'Query', list?: Array<{ __typename?: 'Country', ID: any, name: string, code2: string, continentCode: string }> | null };

export type __AccountDataFragment = { __typename?: 'Account', ID: any, title: string, description: string, status: ApproveStatus, statusMessage?: string | null, logoURI: string, policyURI: string, termsOfServiceURI: string, clientURI: string, contacts?: Array<string> | null, createdAt: any, updatedAt: any };

export type GetAccountQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetAccountQuery = { __typename?: 'Query', result: { __typename?: 'AccountPayload', data?: { __typename?: 'Account', ID: any, title: string, description: string, status: ApproveStatus, statusMessage?: string | null, logoURI: string, policyURI: string, termsOfServiceURI: string, clientURI: string, contacts?: Array<string> | null, createdAt: any, updatedAt: any } | null } };

export type GetAccountsQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<AccountListFilter>;
  order?: InputMaybe<AccountListOrder>;
}>;


export type GetAccountsQuery = { __typename?: 'Query', permApprove?: string | null, permReject?: string | null, result?: { __typename?: 'AccountConnection', list?: Array<{ __typename?: 'Account', ID: any, title: string, description: string, status: ApproveStatus, statusMessage?: string | null, logoURI: string, policyURI: string, termsOfServiceURI: string, clientURI: string, contacts?: Array<string> | null, createdAt: any, updatedAt: any }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  data: AccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'AccountPayload', clientMutationID: string, accountID: any, account?: { __typename?: 'Account', ID: any, title: string, description: string, status: ApproveStatus, statusMessage?: string | null, logoURI: string, policyURI: string, termsOfServiceURI: string, clientURI: string, contacts?: Array<string> | null, createdAt: any, updatedAt: any } | null } };

export type RegisterAccountMutationVariables = Exact<{
  input: AccountCreateInput;
}>;


export type RegisterAccountMutation = { __typename?: 'Mutation', registerAccount: { __typename?: 'AccountCreatePayload', clientMutationID: string, account: { __typename?: 'Account', ID: any, title: string, description: string, status: ApproveStatus, statusMessage?: string | null, logoURI: string, policyURI: string, termsOfServiceURI: string, clientURI: string, contacts?: Array<string> | null, createdAt: any, updatedAt: any }, owner: { __typename?: 'User', ID: any, username: string, status: ApproveStatus, statusMessage?: string | null, createdAt: any, updatedAt: any } } };

export type ApproveAccountMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: Scalars['String']['input'];
}>;


export type ApproveAccountMutation = { __typename?: 'Mutation', approveAccount: { __typename?: 'AccountPayload', clientMutationID: string } };

export type RejectAccountMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: Scalars['String']['input'];
}>;


export type RejectAccountMutation = { __typename?: 'Mutation', rejectAccount: { __typename?: 'AccountPayload', clientMutationID: string } };

export type __UserDataFragment = { __typename?: 'User', ID: any, username: string, status: ApproveStatus, statusMessage?: string | null, createdAt: any, updatedAt: any };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', result: { __typename?: 'UserPayload', user?: { __typename?: 'User', ID: any, username: string, status: ApproveStatus, statusMessage?: string | null, createdAt: any, updatedAt: any } | null } };

export type GetUsersQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<UserListFilter>;
  order?: InputMaybe<UserListOrder>;
}>;


export type GetUsersQuery = { __typename?: 'Query', permApprove?: string | null, permReject?: string | null, result?: { __typename?: 'UserConnection', list?: Array<{ __typename?: 'User', ID: any, username: string, status: ApproveStatus, statusMessage?: string | null, createdAt: any, updatedAt: any }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type ResetUserPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetUserPasswordMutation = { __typename?: 'Mutation', resetUserPassword: { __typename?: 'StatusResponse', status: ResponseStatus, message?: string | null } };

export type UpdateUserPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: { __typename?: 'StatusResponse', status: ResponseStatus, message?: string | null } };

export type ApproveUserMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: Scalars['String']['input'];
}>;


export type ApproveUserMutation = { __typename?: 'Mutation', approveUser: { __typename?: 'UserPayload', clientMutationID: string } };

export type RejectUserMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: Scalars['String']['input'];
}>;


export type RejectUserMutation = { __typename?: 'Mutation', rejectUser: { __typename?: 'UserPayload', clientMutationID: string } };

export type __MemberDataFragment = { __typename?: 'Member', ID: any, status: ApproveStatus, isAdmin: boolean, updatedAt: any, account: { __typename?: 'Account', ID: any, title: string, logoURI: string, status: ApproveStatus, statusMessage?: string | null, updatedAt: any }, user: { __typename?: 'User', ID: any, username: string, status: ApproveStatus, statusMessage?: string | null, updatedAt: any }, roles?: Array<{ __typename?: 'RBACRole', ID: any, name: string, title: string }> | null };

export type GetMembersQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<MemberListFilter>;
  order?: InputMaybe<MemberListOrder>;
}>;


export type GetMembersQuery = { __typename?: 'Query', permApprove?: string | null, permReject?: string | null, permUpdate?: string | null, result?: { __typename?: 'MemberConnection', totalCount: number, list?: Array<{ __typename?: 'Member', ID: any, status: ApproveStatus, isAdmin: boolean, updatedAt: any, account: { __typename?: 'Account', ID: any, title: string, logoURI: string, status: ApproveStatus, statusMessage?: string | null, updatedAt: any }, user: { __typename?: 'User', ID: any, username: string, status: ApproveStatus, statusMessage?: string | null, updatedAt: any }, roles?: Array<{ __typename?: 'RBACRole', ID: any, name: string, title: string }> | null }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null, roles?: { __typename?: 'RBACRoleConnection', list?: Array<{ __typename?: 'RBACRole', ID: any, title: string, name: string }> | null } | null };

export type UpdateMemberMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  data: MemberInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateAccountMember: { __typename?: 'MemberPayload', clientMutationID: string, memberID: any, member?: { __typename?: 'Member', ID: any, status: ApproveStatus, isAdmin: boolean, updatedAt: any, account: { __typename?: 'Account', ID: any, title: string, logoURI: string, status: ApproveStatus, statusMessage?: string | null, updatedAt: any }, user: { __typename?: 'User', ID: any, username: string, status: ApproveStatus, statusMessage?: string | null, updatedAt: any }, roles?: Array<{ __typename?: 'RBACRole', ID: any, name: string, title: string }> | null } | null } };

export type __SocialAccountDataFragment = { __typename?: 'SocialAccount', ID: any, userID: any, email: string, username: string, provider: string, firstName: string, lastName: string, avatar: string, link: string, data: any, sessions?: Array<{ __typename?: 'SocialAccountSession', name: string, scope?: Array<string> | null, tokenType: string, expiresAt?: any | null }> | null };

export type GetCurrentSocialAccountsQueryVariables = Exact<{
  filter?: InputMaybe<SocialAccountListFilter>;
}>;


export type GetCurrentSocialAccountsQuery = { __typename?: 'Query', result: { __typename?: 'SocialAccountConnection', list?: Array<{ __typename?: 'SocialAccount', ID: any, userID: any, email: string, username: string, provider: string, firstName: string, lastName: string, avatar: string, link: string, data: any, sessions?: Array<{ __typename?: 'SocialAccountSession', name: string, scope?: Array<string> | null, tokenType: string, expiresAt?: any | null }> | null }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } };

export type DisconnectSocialAccountMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type DisconnectSocialAccountMutation = { __typename?: 'Mutation', result: { __typename?: 'SocialAccountPayload', clientMutationID: string } };

export type __PermDataFragment = { __typename?: 'RBACPermission', name: string, object: string, access: string, fullname: string, description?: string | null };

export type ListPermissionsQueryVariables = Exact<{
  patterns?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type ListPermissionsQuery = { __typename?: 'Query', all?: Array<{ __typename?: 'RBACPermission', name: string, object: string, access: string, fullname: string, description?: string | null }> | null, my?: Array<{ __typename?: 'RBACPermission', name: string, object: string, access: string, fullname: string, description?: string | null }> | null };

export type ListDirectAccessTokensQueryVariables = Exact<{
  expiresAt?: InputMaybe<Scalars['Time']['input']>;
}>;


export type ListDirectAccessTokensQuery = { __typename?: 'Query', tokens?: { __typename?: 'DirectAccessTokenConnection', list?: Array<{ __typename?: 'DirectAccessToken', ID: any, token: string, description: string, userID?: any | null, accountID: any, expiresAt: any }> | null } | null };

export type GenerateDirectAccessTokenMutationVariables = Exact<{
  userID?: InputMaybe<Scalars['ID64']['input']>;
  expiresAt?: InputMaybe<Scalars['Time']['input']>;
}>;


export type GenerateDirectAccessTokenMutation = { __typename?: 'Mutation', result?: { __typename?: 'DirectAccessTokenPayload', clientMutationID: string, token?: { __typename?: 'DirectAccessToken', ID: any, token: string, description: string, userID?: any | null, accountID: any, expiresAt: any } | null } | null };

export type RevokeDirectAccessTokenMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type RevokeDirectAccessTokenMutation = { __typename?: 'Mutation', result?: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus } | null };

export type __RtbSourceDataFragment = { __typename?: 'RTBSource', ID: any, title: string, description: string, status: ApproveStatus, active: ActiveStatus, accountID: any, flags: any, protocol: string, minimalWeight: number, URL: string, method: string, requestType: RtbRequestFormatType, headers: any, RPS: number, timeout: number, accuracy: number, priceCorrectionReduce: number, auctionType: AuctionType, minBid: number, maxBid: number, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, carriers?: Array<any> | null, categories?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, domains?: Array<string> | null, zones?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null };

export type GetRtbSourceQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetRtbSourceQuery = { __typename?: 'Query', result: { __typename?: 'RTBSourcePayload', clientMutationID: string, data: { __typename?: 'RTBSource', ID: any, title: string, description: string, status: ApproveStatus, active: ActiveStatus, accountID: any, flags: any, protocol: string, minimalWeight: number, URL: string, method: string, requestType: RtbRequestFormatType, headers: any, RPS: number, timeout: number, accuracy: number, priceCorrectionReduce: number, auctionType: AuctionType, minBid: number, maxBid: number, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, carriers?: Array<any> | null, categories?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, domains?: Array<string> | null, zones?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type ListRtbSourcesQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<RtbSourceListFilter>;
  order?: InputMaybe<RtbSourceListOrder>;
}>;


export type ListRtbSourcesQuery = { __typename?: 'Query', permApprove?: string | null, permReject?: string | null, result?: { __typename?: 'RTBSourceConnection', list: Array<{ __typename?: 'RTBSource', ID: any, title: string, description: string, status: ApproveStatus, active: ActiveStatus, accountID: any, flags: any, protocol: string, minimalWeight: number, URL: string, method: string, requestType: RtbRequestFormatType, headers: any, RPS: number, timeout: number, accuracy: number, priceCorrectionReduce: number, auctionType: AuctionType, minBid: number, maxBid: number, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, carriers?: Array<any> | null, categories?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, domains?: Array<string> | null, zones?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type NewRtbSourceMutationVariables = Exact<{
  input: RtbSourceInput;
}>;


export type NewRtbSourceMutation = { __typename?: 'Mutation', result: { __typename?: 'RTBSourcePayload', clientMutationID: string, sourceID: any, data: { __typename?: 'RTBSource', ID: any, title: string, description: string, status: ApproveStatus, active: ActiveStatus, accountID: any, flags: any, protocol: string, minimalWeight: number, URL: string, method: string, requestType: RtbRequestFormatType, headers: any, RPS: number, timeout: number, accuracy: number, priceCorrectionReduce: number, auctionType: AuctionType, minBid: number, maxBid: number, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, carriers?: Array<any> | null, categories?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, domains?: Array<string> | null, zones?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type UpdateRtbSourceMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: RtbSourceInput;
}>;


export type UpdateRtbSourceMutation = { __typename?: 'Mutation', result: { __typename?: 'RTBSourcePayload', clientMutationID: string, sourceID: any, data: { __typename?: 'RTBSource', ID: any, title: string, description: string, status: ApproveStatus, active: ActiveStatus, accountID: any, flags: any, protocol: string, minimalWeight: number, URL: string, method: string, requestType: RtbRequestFormatType, headers: any, RPS: number, timeout: number, accuracy: number, priceCorrectionReduce: number, auctionType: AuctionType, minBid: number, maxBid: number, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, carriers?: Array<any> | null, categories?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, domains?: Array<string> | null, zones?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, config: any, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type DeleteRtbSourceMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type DeleteRtbSourceMutation = { __typename?: 'Mutation', result?: { __typename?: 'RTBSourcePayload', clientMutationID: string } | null };

export type RunRtbSourceMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type RunRtbSourceMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus } };

export type PauseRtbSourceMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type PauseRtbSourceMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus } };

export type ApproveRtbSourceMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type ApproveRtbSourceMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type RejectRtbSourceMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type RejectRtbSourceMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type __RtbAccessPointDataFragment = { __typename?: 'RTBAccessPoint', ID: any, accountID: any, codename: string, title: string, description: string, auctionType: AuctionType, status: ApproveStatus, active: ActiveStatus, flags: any, revenueShareReduce?: number | null, fixedPurchasePrice: number, maxBid: number, requestType: RtbRequestFormatType, protocol: string, timeout: number, RPS: number, domainDefault: string, headers: any, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, categories?: Array<any> | null, carriers?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, zones?: Array<any> | null, domains?: Array<string> | null, sources?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, createdAt: any, updatedAt: any, deletedAt?: any | null };

export type GetRtbAccessPointQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetRtbAccessPointQuery = { __typename?: 'Query', result: { __typename?: 'RTBAccessPointPayload', clientMutationID: string, data: { __typename?: 'RTBAccessPoint', ID: any, accountID: any, codename: string, title: string, description: string, auctionType: AuctionType, status: ApproveStatus, active: ActiveStatus, flags: any, revenueShareReduce?: number | null, fixedPurchasePrice: number, maxBid: number, requestType: RtbRequestFormatType, protocol: string, timeout: number, RPS: number, domainDefault: string, headers: any, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, categories?: Array<any> | null, carriers?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, zones?: Array<any> | null, domains?: Array<string> | null, sources?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type ListRtbAccessPointsQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<RtbAccessPointListFilter>;
  order?: InputMaybe<RtbAccessPointListOrder>;
}>;


export type ListRtbAccessPointsQuery = { __typename?: 'Query', permApprove?: string | null, permReject?: string | null, result?: { __typename?: 'RTBAccessPointConnection', list: Array<{ __typename?: 'RTBAccessPoint', ID: any, accountID: any, codename: string, title: string, description: string, auctionType: AuctionType, status: ApproveStatus, active: ActiveStatus, flags: any, revenueShareReduce?: number | null, fixedPurchasePrice: number, maxBid: number, requestType: RtbRequestFormatType, protocol: string, timeout: number, RPS: number, domainDefault: string, headers: any, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, categories?: Array<any> | null, carriers?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, zones?: Array<any> | null, domains?: Array<string> | null, sources?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, createdAt: any, updatedAt: any, deletedAt?: any | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type NewRtbAccessPointMutationVariables = Exact<{
  input: RtbAccessPointInput;
}>;


export type NewRtbAccessPointMutation = { __typename?: 'Mutation', result: { __typename?: 'RTBAccessPointPayload', clientMutationID: string, accessPointID: any, data: { __typename?: 'RTBAccessPoint', ID: any, accountID: any, codename: string, title: string, description: string, auctionType: AuctionType, status: ApproveStatus, active: ActiveStatus, flags: any, revenueShareReduce?: number | null, fixedPurchasePrice: number, maxBid: number, requestType: RtbRequestFormatType, protocol: string, timeout: number, RPS: number, domainDefault: string, headers: any, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, categories?: Array<any> | null, carriers?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, zones?: Array<any> | null, domains?: Array<string> | null, sources?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type UpdateRtbAccessPointMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: RtbAccessPointInput;
}>;


export type UpdateRtbAccessPointMutation = { __typename?: 'Mutation', result: { __typename?: 'RTBAccessPointPayload', clientMutationID: string, accessPointID: any, data: { __typename?: 'RTBAccessPoint', ID: any, accountID: any, codename: string, title: string, description: string, auctionType: AuctionType, status: ApproveStatus, active: ActiveStatus, flags: any, revenueShareReduce?: number | null, fixedPurchasePrice: number, maxBid: number, requestType: RtbRequestFormatType, protocol: string, timeout: number, RPS: number, domainDefault: string, headers: any, formats?: Array<string> | null, deviceTypes?: Array<any> | null, devices?: Array<any> | null, OS?: Array<any> | null, browsers?: Array<any> | null, categories?: Array<any> | null, carriers?: Array<any> | null, countries?: Array<string> | null, languages?: Array<string> | null, applications?: Array<any> | null, zones?: Array<any> | null, domains?: Array<string> | null, sources?: Array<any> | null, secure: AnyOnlyExclude, adBlock: AnyOnlyExclude, privateBrowsing: AnyOnlyExclude, IP: AnyIPv4IPv6, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type DeleteRtbAccessPointMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type DeleteRtbAccessPointMutation = { __typename?: 'Mutation', result?: { __typename?: 'RTBAccessPointPayload', clientMutationID: string } | null };

export type RunRtbAccessPointMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type RunRtbAccessPointMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus } };

export type PauseRtbAccessPointMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type PauseRtbAccessPointMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus } };

export type ApproveRtbAccessPointMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type ApproveRtbAccessPointMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type RejectRtbAccessPointMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type RejectRtbAccessPointMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type GetBrowserQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetBrowserQuery = { __typename?: 'Query', result?: { __typename?: 'BrowserPayload', clientMutationID: string, data: { __typename?: 'Browser', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'BrowserVersion', name: string, min: string, max: string }> | null } } | null };

export type ListBrowsersQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<BrowserListFilter>;
  order?: InputMaybe<BrowserListOrder>;
}>;


export type ListBrowsersQuery = { __typename?: 'Query', result?: { __typename?: 'BrowserConnection', totalCount: number, list: Array<{ __typename?: 'Browser', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'BrowserVersion', name: string, min: string, max: string }> | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type NewBrowserMutationVariables = Exact<{
  input: BrowserInput;
}>;


export type NewBrowserMutation = { __typename?: 'Mutation', result?: { __typename?: 'BrowserPayload', clientMutationID: string, browserID: any, browser: { __typename?: 'Browser', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'BrowserVersion', name: string, min: string, max: string }> | null } } | null };

export type UpdateBrowserMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: BrowserInput;
}>;


export type UpdateBrowserMutation = { __typename?: 'Mutation', result?: { __typename?: 'BrowserPayload', clientMutationID: string, browserID: any, browser: { __typename?: 'Browser', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'BrowserVersion', name: string, min: string, max: string }> | null } } | null };

export type __BrowserDataFragment = { __typename?: 'Browser', ID: any, name: string, description: string, matchExp: string, active: ActiveStatus, createdAt: any, updatedAt: any, deletedAt?: any | null, versions?: Array<{ __typename?: 'BrowserVersion', name: string, min: string, max: string }> | null };

export type __DeviceTypeFragment = { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string };

export type __DeviceModelShortFragment = { __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null };

export type __DeviceModelFragment = { __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, maker?: { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any } | null, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null };

export type __DeviceMakerShortFragment = { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any };

export type __DeviceMakerFragment = { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any, types?: Array<{ __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string }> | null, models?: Array<{ __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null }> | null };

export type GetDeviceMakerQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetDeviceMakerQuery = { __typename?: 'Query', result?: { __typename?: 'DeviceMakerPayload', data: { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any, types?: Array<{ __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string }> | null, models?: Array<{ __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null }> | null } } | null };

export type ListDeviceMakersQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<DeviceMakerListFilter>;
  order?: InputMaybe<DeviceMakerListOrder>;
}>;


export type ListDeviceMakersQuery = { __typename?: 'Query', result?: { __typename?: 'DeviceMakerConnection', list: Array<{ __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any, types?: Array<{ __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string }> | null, models?: Array<{ __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null }> | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type CreateDeviceMakerMutationVariables = Exact<{
  input: DeviceMakerInput;
}>;


export type CreateDeviceMakerMutation = { __typename?: 'Mutation', result?: { __typename?: 'DeviceMakerPayload', data: { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any, types?: Array<{ __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string }> | null, models?: Array<{ __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null }> | null } } | null };

export type UpdateDeviceMakerMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: DeviceMakerInput;
}>;


export type UpdateDeviceMakerMutation = { __typename?: 'Mutation', result?: { __typename?: 'DeviceMakerPayload', data: { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any, types?: Array<{ __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string }> | null, models?: Array<{ __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null }> | null } } | null };

export type ListDeviceTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListDeviceTypesQuery = { __typename?: 'Query', result?: Array<{ __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string }> | null };

export type GetDeviceModelQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetDeviceModelQuery = { __typename?: 'Query', result?: { __typename?: 'DeviceModelPayload', data: { __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, maker?: { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any } | null, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null } } | null };

export type ListDeviceModelsQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<DeviceModelListFilter>;
  order?: InputMaybe<DeviceModelListOrder>;
}>;


export type ListDeviceModelsQuery = { __typename?: 'Query', result?: { __typename?: 'DeviceModelConnection', list: Array<{ __typename?: 'DeviceModel', ID: any, active: ActiveStatus, name: string, description: string, matchExp: string, makerID: any, createdAt: any, updatedAt: any, maker?: { __typename?: 'DeviceMaker', ID: any, name: string, description: string, active: ActiveStatus, matchExp: string, createdAt: any, updatedAt: any } | null, versions?: Array<{ __typename?: 'DeviceModelVersion', name: string, min: string, max: string }> | null, type?: { __typename?: 'DeviceType', ID: any, active: ActiveStatus, name: string, description: string } | null }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type __StatItemFragment = { __typename?: 'StatisticAdItem', spent: number, profit: number, bidPrice: number, requests: any, impressions: any, views: any, directs: any, clicks: any, leads: any, bids: any, wins: any, skips: any, nobids: any, errors: any, CTR: number, eCPM: number, eCPC: number, eCPA: number, keys?: Array<{ __typename?: 'StatisticItemKey', key: StatisticKey, value: any, text: string }> | null };

export type StatisticsQueryVariables = Exact<{
  filter?: InputMaybe<StatisticAdListFilter>;
  group: Array<StatisticKey> | StatisticKey;
  order?: InputMaybe<Array<StatisticAdKeyOrder> | StatisticAdKeyOrder>;
  page?: InputMaybe<Page>;
}>;


export type StatisticsQuery = { __typename?: 'Query', result: { __typename?: 'StatisticAdItemConnection', totalCount: number, list?: Array<{ __typename?: 'StatisticAdItem', spent: number, profit: number, bidPrice: number, requests: any, impressions: any, views: any, directs: any, clicks: any, leads: any, bids: any, wins: any, skips: any, nobids: any, errors: any, CTR: number, eCPM: number, eCPC: number, eCPA: number, keys?: Array<{ __typename?: 'StatisticItemKey', key: StatisticKey, value: any, text: string }> | null }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } };

export type __BillingBalanceFragment = { __typename?: 'Balance', balance: number, credit: number };

export type GetBillingBalanceQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type GetBillingBalanceQuery = { __typename?: 'Query', result?: { __typename?: 'Balance', balance: number, credit: number } | null };

export type ListHistoryQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<HistoryActionListFilter>;
  order?: InputMaybe<HistoryActionListOrder>;
}>;


export type ListHistoryQuery = { __typename?: 'Query', result?: { __typename?: 'HistoryActionConnection', totalCount: number, list?: Array<{ __typename?: 'HistoryAction', ID: any, RequestID: string, name: string, message: string, userID: any, accountID: any, objectType: string, objectIDs: string, data: any, actionAt: any }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type __ZoneDataFragment = { __typename?: 'Zone', ID: any, codename: string, accountID: any, title: string, description: string, type: ZoneType, status: ApproveStatus, active: ActiveStatus, defaultCode: any, context: any, minECPM: number, fixedPurchasePrice: number, allowedFormats?: Array<string> | null, allowedTypes?: Array<any> | null, allowedSources?: Array<any> | null, disallowedSources?: Array<any> | null, campaigns?: Array<any> | null, createdAt: any, updatedAt: any, deletedAt?: any | null };

export type GetZoneQueryVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type GetZoneQuery = { __typename?: 'Query', result: { __typename?: 'ZonePayload', clientMutationID: string, data: { __typename?: 'Zone', ID: any, codename: string, accountID: any, title: string, description: string, type: ZoneType, status: ApproveStatus, active: ActiveStatus, defaultCode: any, context: any, minECPM: number, fixedPurchasePrice: number, allowedFormats?: Array<string> | null, allowedTypes?: Array<any> | null, allowedSources?: Array<any> | null, disallowedSources?: Array<any> | null, campaigns?: Array<any> | null, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type ListZonesQueryVariables = Exact<{
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
  filter?: InputMaybe<ZoneListFilter>;
  order?: InputMaybe<ZoneListOrder>;
}>;


export type ListZonesQuery = { __typename?: 'Query', permApprove?: string | null, permReject?: string | null, result?: { __typename?: 'ZoneConnection', totalCount: number, list?: Array<{ __typename?: 'Zone', ID: any, codename: string, accountID: any, title: string, description: string, type: ZoneType, status: ApproveStatus, active: ActiveStatus, defaultCode: any, context: any, minECPM: number, fixedPurchasePrice: number, allowedFormats?: Array<string> | null, allowedTypes?: Array<any> | null, allowedSources?: Array<any> | null, disallowedSources?: Array<any> | null, campaigns?: Array<any> | null, createdAt: any, updatedAt: any, deletedAt?: any | null }> | null, pageInfo: { __typename?: 'PageInfo', total: number, page: number, count: number } } | null };

export type CreateZoneMutationVariables = Exact<{
  input: ZoneInput;
}>;


export type CreateZoneMutation = { __typename?: 'Mutation', result: { __typename?: 'ZonePayload', clientMutationID: string, zoneID: any, data: { __typename?: 'Zone', ID: any, codename: string, accountID: any, title: string, description: string, type: ZoneType, status: ApproveStatus, active: ActiveStatus, defaultCode: any, context: any, minECPM: number, fixedPurchasePrice: number, allowedFormats?: Array<string> | null, allowedTypes?: Array<any> | null, allowedSources?: Array<any> | null, disallowedSources?: Array<any> | null, campaigns?: Array<any> | null, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type UpdateZoneMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  input: ZoneInput;
}>;


export type UpdateZoneMutation = { __typename?: 'Mutation', result: { __typename?: 'ZonePayload', clientMutationID: string, zoneID: any, data: { __typename?: 'Zone', ID: any, codename: string, accountID: any, title: string, description: string, type: ZoneType, status: ApproveStatus, active: ActiveStatus, defaultCode: any, context: any, minECPM: number, fixedPurchasePrice: number, allowedFormats?: Array<string> | null, allowedTypes?: Array<any> | null, allowedSources?: Array<any> | null, disallowedSources?: Array<any> | null, campaigns?: Array<any> | null, createdAt: any, updatedAt: any, deletedAt?: any | null } } };

export type DeleteZoneMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
}>;


export type DeleteZoneMutation = { __typename?: 'Mutation', result?: { __typename?: 'ZonePayload', clientMutationID: string } | null };

export type ApproveZoneMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type ApproveZoneMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type RejectZoneMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type RejectZoneMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type ActivateZoneMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type ActivateZoneMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export type DeactivateZoneMutationVariables = Exact<{
  id: Scalars['ID64']['input'];
  msg?: InputMaybe<Scalars['String']['input']>;
}>;


export type DeactivateZoneMutation = { __typename?: 'Mutation', result: { __typename?: 'StatusResponse', clientMutationID: string, status: ResponseStatus, message?: string | null } };

export const __FormatDataFragmentDoc = gql`
    fragment __formatData on AdFormat {
  ID
  codename
  type
  title
  description
  active
  width
  height
  minWidth
  minHeight
  config
  createdAt
  updatedAt
  deletedAt
}
    `;
export const __ApplicationDataFragmentDoc = gql`
    fragment __applicationData on Application {
  ID
  accountID
  creatorID
  title
  description
  URI
  type
  platform
  premium
  status
  active
  categories
  revenueShare
  createdAt
  updatedAt
  deletedAt
}
    `;
export const __CategoryDataFragmentDoc = gql`
    fragment __categoryData on Category {
  ID
  name
  description
  IABCode
  parentID
  parent {
    ID
    name
  }
  position
  active
  createdAt
  updatedAt
  deletedAt
}
    `;
export const __OsDataFragmentDoc = gql`
    fragment __osData on OS {
  ID
  name
  description
  matchExp
  active
  versions {
    name
    min
    max
  }
  createdAt
  updatedAt
  deletedAt
}
    `;
export const __PageInfoFragmentDoc = gql`
    fragment __pageInfo on PageInfo {
  total
  page
  count
}
    `;
export const __AccountDataFragmentDoc = gql`
    fragment __accountData on Account {
  ID
  title
  description
  status
  statusMessage
  logoURI
  policyURI
  termsOfServiceURI
  clientURI
  contacts
  createdAt
  updatedAt
}
    `;
export const __UserDataFragmentDoc = gql`
    fragment __userData on User {
  ID
  username
  status
  statusMessage
  createdAt
  updatedAt
}
    `;
export const __MemberDataFragmentDoc = gql`
    fragment __memberData on Member {
  ID
  status
  isAdmin
  updatedAt
  account {
    ID
    title
    logoURI
    status
    statusMessage
    updatedAt
  }
  user {
    ID
    username
    status
    statusMessage
    updatedAt
  }
  roles {
    ID
    name
    title
  }
}
    `;
export const __SocialAccountDataFragmentDoc = gql`
    fragment __socialAccountData on SocialAccount {
  ID
  userID
  email
  username
  provider
  firstName
  lastName
  avatar
  link
  data
  sessions {
    name
    scope
    tokenType
    expiresAt
  }
}
    `;
export const __PermDataFragmentDoc = gql`
    fragment __permData on RBACPermission {
  name
  object
  access
  fullname
  description
}
    `;
export const __RtbSourceDataFragmentDoc = gql`
    fragment __rtbSourceData on RTBSource {
  ID
  title
  description
  status
  active
  accountID
  flags
  protocol
  minimalWeight
  URL
  method
  requestType
  headers
  RPS
  timeout
  accuracy
  priceCorrectionReduce
  auctionType
  minBid
  maxBid
  formats
  deviceTypes
  devices
  OS
  browsers
  carriers
  categories
  countries
  languages
  applications
  domains
  zones
  secure
  adBlock
  privateBrowsing
  IP
  config
  createdAt
  updatedAt
  deletedAt
}
    `;
export const __RtbAccessPointDataFragmentDoc = gql`
    fragment __rtbAccessPointData on RTBAccessPoint {
  ID
  accountID
  codename
  title
  description
  auctionType
  status
  active
  flags
  revenueShareReduce
  fixedPurchasePrice
  maxBid
  requestType
  protocol
  timeout
  RPS
  domainDefault
  headers
  formats
  deviceTypes
  devices
  OS
  browsers
  categories
  carriers
  countries
  languages
  applications
  zones
  domains
  sources
  secure
  adBlock
  privateBrowsing
  IP
  createdAt
  updatedAt
  deletedAt
}
    `;
export const __BrowserDataFragmentDoc = gql`
    fragment __browserData on Browser {
  ID
  name
  description
  matchExp
  active
  versions {
    name
    min
    max
  }
  createdAt
  updatedAt
  deletedAt
}
    `;
export const __DeviceTypeFragmentDoc = gql`
    fragment __deviceType on DeviceType {
  ID
  active
  name
  description
}
    `;
export const __DeviceModelShortFragmentDoc = gql`
    fragment __deviceModelShort on DeviceModel {
  ID
  active
  name
  description
  matchExp
  makerID
  versions {
    name
    min
    max
  }
  type {
    ...__deviceType
  }
  createdAt
  updatedAt
}
    ${__DeviceTypeFragmentDoc}`;
export const __DeviceMakerShortFragmentDoc = gql`
    fragment __deviceMakerShort on DeviceMaker {
  ID
  name
  description
  active
  matchExp
  createdAt
  updatedAt
}
    `;
export const __DeviceModelFragmentDoc = gql`
    fragment __deviceModel on DeviceModel {
  ...__deviceModelShort
  maker {
    ...__deviceMakerShort
  }
}
    ${__DeviceModelShortFragmentDoc}
${__DeviceMakerShortFragmentDoc}`;
export const __DeviceMakerFragmentDoc = gql`
    fragment __deviceMaker on DeviceMaker {
  ...__deviceMakerShort
  types {
    ...__deviceType
  }
  models {
    ...__deviceModelShort
  }
}
    ${__DeviceMakerShortFragmentDoc}
${__DeviceTypeFragmentDoc}
${__DeviceModelShortFragmentDoc}`;
export const __StatItemFragmentDoc = gql`
    fragment __statItem on StatisticAdItem {
  keys {
    key
    value
    text
  }
  spent
  profit
  bidPrice
  requests
  impressions
  views
  directs
  clicks
  leads
  bids
  wins
  skips
  nobids
  errors
  CTR
  eCPM
  eCPC
  eCPA
}
    `;
export const __BillingBalanceFragmentDoc = gql`
    fragment __billingBalance on Balance {
  balance
  credit
}
    `;
export const __ZoneDataFragmentDoc = gql`
    fragment __zoneData on Zone {
  ID
  codename
  accountID
  title
  description
  type
  status
  active
  defaultCode
  context
  minECPM
  fixedPurchasePrice
  allowedFormats
  allowedTypes
  allowedSources
  disallowedSources
  campaigns
  createdAt
  updatedAt
  deletedAt
}
    `;
export const ListAdFormatsDocument = gql`
    query ListAdFormats($page: Int! = 0, $size: Int! = 10, $filter: AdFormatListFilter = null, $order: AdFormatListOrder = null) {
  result: listFormats(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    totalCount
    list {
      ...__formatData
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__FormatDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListAdFormatsQuery__
 *
 * To run a query within a React component, call `useListAdFormatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAdFormatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAdFormatsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListAdFormatsQuery(baseOptions?: Apollo.QueryHookOptions<ListAdFormatsQuery, ListAdFormatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListAdFormatsQuery, ListAdFormatsQueryVariables>(ListAdFormatsDocument, options);
      }
export function useListAdFormatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListAdFormatsQuery, ListAdFormatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListAdFormatsQuery, ListAdFormatsQueryVariables>(ListAdFormatsDocument, options);
        }
export function useListAdFormatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListAdFormatsQuery, ListAdFormatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListAdFormatsQuery, ListAdFormatsQueryVariables>(ListAdFormatsDocument, options);
        }
export type ListAdFormatsQueryHookResult = ReturnType<typeof useListAdFormatsQuery>;
export type ListAdFormatsLazyQueryHookResult = ReturnType<typeof useListAdFormatsLazyQuery>;
export type ListAdFormatsSuspenseQueryHookResult = ReturnType<typeof useListAdFormatsSuspenseQuery>;
export type ListAdFormatsQueryResult = Apollo.QueryResult<ListAdFormatsQuery, ListAdFormatsQueryVariables>;
export const GetAdFormatDocument = gql`
    query GetAdFormat($id: ID64! = 0, $codename: String! = "") {
  result: format(ID: $id, codename: $codename) {
    clientMutationID
    data: format {
      ...__formatData
    }
  }
}
    ${__FormatDataFragmentDoc}`;

/**
 * __useGetAdFormatQuery__
 *
 * To run a query within a React component, call `useGetAdFormatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdFormatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdFormatQuery({
 *   variables: {
 *      id: // value for 'id'
 *      codename: // value for 'codename'
 *   },
 * });
 */
export function useGetAdFormatQuery(baseOptions?: Apollo.QueryHookOptions<GetAdFormatQuery, GetAdFormatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdFormatQuery, GetAdFormatQueryVariables>(GetAdFormatDocument, options);
      }
export function useGetAdFormatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdFormatQuery, GetAdFormatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdFormatQuery, GetAdFormatQueryVariables>(GetAdFormatDocument, options);
        }
export function useGetAdFormatSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdFormatQuery, GetAdFormatQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdFormatQuery, GetAdFormatQueryVariables>(GetAdFormatDocument, options);
        }
export type GetAdFormatQueryHookResult = ReturnType<typeof useGetAdFormatQuery>;
export type GetAdFormatLazyQueryHookResult = ReturnType<typeof useGetAdFormatLazyQuery>;
export type GetAdFormatSuspenseQueryHookResult = ReturnType<typeof useGetAdFormatSuspenseQuery>;
export type GetAdFormatQueryResult = Apollo.QueryResult<GetAdFormatQuery, GetAdFormatQueryVariables>;
export const CreateAdFormatDocument = gql`
    mutation CreateAdFormat($input: AdFormatInput!) {
  result: createFormat(input: $input) {
    clientMutationID
    formatID
    data: format {
      ...__formatData
    }
  }
}
    ${__FormatDataFragmentDoc}`;
export type CreateAdFormatMutationFn = Apollo.MutationFunction<CreateAdFormatMutation, CreateAdFormatMutationVariables>;

/**
 * __useCreateAdFormatMutation__
 *
 * To run a mutation, you first call `useCreateAdFormatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdFormatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdFormatMutation, { data, loading, error }] = useCreateAdFormatMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAdFormatMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdFormatMutation, CreateAdFormatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdFormatMutation, CreateAdFormatMutationVariables>(CreateAdFormatDocument, options);
      }
export type CreateAdFormatMutationHookResult = ReturnType<typeof useCreateAdFormatMutation>;
export type CreateAdFormatMutationResult = Apollo.MutationResult<CreateAdFormatMutation>;
export type CreateAdFormatMutationOptions = Apollo.BaseMutationOptions<CreateAdFormatMutation, CreateAdFormatMutationVariables>;
export const UpdateAdFormatDocument = gql`
    mutation UpdateAdFormat($id: ID64!, $input: AdFormatInput!) {
  result: updateFormat(ID: $id, input: $input) {
    clientMutationID
    formatID
    data: format {
      ...__formatData
    }
  }
}
    ${__FormatDataFragmentDoc}`;
export type UpdateAdFormatMutationFn = Apollo.MutationFunction<UpdateAdFormatMutation, UpdateAdFormatMutationVariables>;

/**
 * __useUpdateAdFormatMutation__
 *
 * To run a mutation, you first call `useUpdateAdFormatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdFormatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdFormatMutation, { data, loading, error }] = useUpdateAdFormatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAdFormatMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdFormatMutation, UpdateAdFormatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdFormatMutation, UpdateAdFormatMutationVariables>(UpdateAdFormatDocument, options);
      }
export type UpdateAdFormatMutationHookResult = ReturnType<typeof useUpdateAdFormatMutation>;
export type UpdateAdFormatMutationResult = Apollo.MutationResult<UpdateAdFormatMutation>;
export type UpdateAdFormatMutationOptions = Apollo.BaseMutationOptions<UpdateAdFormatMutation, UpdateAdFormatMutationVariables>;
export const GetApplicationDocument = gql`
    query GetApplication($id: ID64!) {
  result: application(ID: $id) {
    clientMutationID
    data: application {
      ...__applicationData
    }
  }
}
    ${__ApplicationDataFragmentDoc}`;

/**
 * __useGetApplicationQuery__
 *
 * To run a query within a React component, call `useGetApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetApplicationQuery(baseOptions: Apollo.QueryHookOptions<GetApplicationQuery, GetApplicationQueryVariables> & ({ variables: GetApplicationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApplicationQuery, GetApplicationQueryVariables>(GetApplicationDocument, options);
      }
export function useGetApplicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApplicationQuery, GetApplicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApplicationQuery, GetApplicationQueryVariables>(GetApplicationDocument, options);
        }
export function useGetApplicationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetApplicationQuery, GetApplicationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApplicationQuery, GetApplicationQueryVariables>(GetApplicationDocument, options);
        }
export type GetApplicationQueryHookResult = ReturnType<typeof useGetApplicationQuery>;
export type GetApplicationLazyQueryHookResult = ReturnType<typeof useGetApplicationLazyQuery>;
export type GetApplicationSuspenseQueryHookResult = ReturnType<typeof useGetApplicationSuspenseQuery>;
export type GetApplicationQueryResult = Apollo.QueryResult<GetApplicationQuery, GetApplicationQueryVariables>;
export const ListApplicationsDocument = gql`
    query ListApplications($page: Int! = 0, $size: Int! = 10, $filter: ApplicationListFilter = null, $order: ApplicationListOrder = null) {
  result: listApplications(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    totalCount
    list {
      ...__applicationData
    }
    pageInfo {
      ...__pageInfo
    }
  }
  permApprove: checkPermission(name: "approve.*", key: "adv_application")
  permReject: checkPermission(name: "reject.*", key: "adv_application")
}
    ${__ApplicationDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListApplicationsQuery__
 *
 * To run a query within a React component, call `useListApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListApplicationsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<ListApplicationsQuery, ListApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListApplicationsQuery, ListApplicationsQueryVariables>(ListApplicationsDocument, options);
      }
export function useListApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListApplicationsQuery, ListApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListApplicationsQuery, ListApplicationsQueryVariables>(ListApplicationsDocument, options);
        }
export function useListApplicationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListApplicationsQuery, ListApplicationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListApplicationsQuery, ListApplicationsQueryVariables>(ListApplicationsDocument, options);
        }
export type ListApplicationsQueryHookResult = ReturnType<typeof useListApplicationsQuery>;
export type ListApplicationsLazyQueryHookResult = ReturnType<typeof useListApplicationsLazyQuery>;
export type ListApplicationsSuspenseQueryHookResult = ReturnType<typeof useListApplicationsSuspenseQuery>;
export type ListApplicationsQueryResult = Apollo.QueryResult<ListApplicationsQuery, ListApplicationsQueryVariables>;
export const CreateApplicationDocument = gql`
    mutation CreateApplication($input: ApplicationInput!) {
  result: createApplication(input: $input) {
    clientMutationID
    applicationID
    data: application {
      ...__applicationData
    }
  }
}
    ${__ApplicationDataFragmentDoc}`;
export type CreateApplicationMutationFn = Apollo.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, options);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = Apollo.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = Apollo.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const UpdateApplicationDocument = gql`
    mutation UpdateApplication($id: ID64!, $input: ApplicationInput!) {
  result: updateApplication(ID: $id, input: $input) {
    clientMutationID
    applicationID
    data: application {
      ...__applicationData
    }
  }
}
    ${__ApplicationDataFragmentDoc}`;
export type UpdateApplicationMutationFn = Apollo.MutationFunction<UpdateApplicationMutation, UpdateApplicationMutationVariables>;

/**
 * __useUpdateApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApplicationMutation, { data, loading, error }] = useUpdateApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateApplicationMutation, UpdateApplicationMutationVariables>(UpdateApplicationDocument, options);
      }
export type UpdateApplicationMutationHookResult = ReturnType<typeof useUpdateApplicationMutation>;
export type UpdateApplicationMutationResult = Apollo.MutationResult<UpdateApplicationMutation>;
export type UpdateApplicationMutationOptions = Apollo.BaseMutationOptions<UpdateApplicationMutation, UpdateApplicationMutationVariables>;
export const DeleteApplicationDocument = gql`
    mutation DeleteApplication($id: ID64!) {
  result: deleteApplication(ID: $id) {
    clientMutationID
  }
}
    `;
export type DeleteApplicationMutationFn = Apollo.MutationFunction<DeleteApplicationMutation, DeleteApplicationMutationVariables>;

/**
 * __useDeleteApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApplicationMutation, { data, loading, error }] = useDeleteApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteApplicationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteApplicationMutation, DeleteApplicationMutationVariables>(DeleteApplicationDocument, options);
      }
export type DeleteApplicationMutationHookResult = ReturnType<typeof useDeleteApplicationMutation>;
export type DeleteApplicationMutationResult = Apollo.MutationResult<DeleteApplicationMutation>;
export type DeleteApplicationMutationOptions = Apollo.BaseMutationOptions<DeleteApplicationMutation, DeleteApplicationMutationVariables>;
export const ApproveApplicationDocument = gql`
    mutation ApproveApplication($id: ID64!, $msg: String = null) {
  result: approveApplication(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type ApproveApplicationMutationFn = Apollo.MutationFunction<ApproveApplicationMutation, ApproveApplicationMutationVariables>;

/**
 * __useApproveApplicationMutation__
 *
 * To run a mutation, you first call `useApproveApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveApplicationMutation, { data, loading, error }] = useApproveApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useApproveApplicationMutation(baseOptions?: Apollo.MutationHookOptions<ApproveApplicationMutation, ApproveApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveApplicationMutation, ApproveApplicationMutationVariables>(ApproveApplicationDocument, options);
      }
export type ApproveApplicationMutationHookResult = ReturnType<typeof useApproveApplicationMutation>;
export type ApproveApplicationMutationResult = Apollo.MutationResult<ApproveApplicationMutation>;
export type ApproveApplicationMutationOptions = Apollo.BaseMutationOptions<ApproveApplicationMutation, ApproveApplicationMutationVariables>;
export const RejectApplicationDocument = gql`
    mutation RejectApplication($id: ID64!, $msg: String = null) {
  result: rejectApplication(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type RejectApplicationMutationFn = Apollo.MutationFunction<RejectApplicationMutation, RejectApplicationMutationVariables>;

/**
 * __useRejectApplicationMutation__
 *
 * To run a mutation, you first call `useRejectApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectApplicationMutation, { data, loading, error }] = useRejectApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useRejectApplicationMutation(baseOptions?: Apollo.MutationHookOptions<RejectApplicationMutation, RejectApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectApplicationMutation, RejectApplicationMutationVariables>(RejectApplicationDocument, options);
      }
export type RejectApplicationMutationHookResult = ReturnType<typeof useRejectApplicationMutation>;
export type RejectApplicationMutationResult = Apollo.MutationResult<RejectApplicationMutation>;
export type RejectApplicationMutationOptions = Apollo.BaseMutationOptions<RejectApplicationMutation, RejectApplicationMutationVariables>;
export const RunApplicationDocument = gql`
    mutation RunApplication($id: ID64!, $msg: String = null) {
  result: runApplication(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type RunApplicationMutationFn = Apollo.MutationFunction<RunApplicationMutation, RunApplicationMutationVariables>;

/**
 * __useRunApplicationMutation__
 *
 * To run a mutation, you first call `useRunApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runApplicationMutation, { data, loading, error }] = useRunApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useRunApplicationMutation(baseOptions?: Apollo.MutationHookOptions<RunApplicationMutation, RunApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunApplicationMutation, RunApplicationMutationVariables>(RunApplicationDocument, options);
      }
export type RunApplicationMutationHookResult = ReturnType<typeof useRunApplicationMutation>;
export type RunApplicationMutationResult = Apollo.MutationResult<RunApplicationMutation>;
export type RunApplicationMutationOptions = Apollo.BaseMutationOptions<RunApplicationMutation, RunApplicationMutationVariables>;
export const PauseApplicationDocument = gql`
    mutation PauseApplication($id: ID64!, $msg: String = null) {
  result: pauseApplication(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type PauseApplicationMutationFn = Apollo.MutationFunction<PauseApplicationMutation, PauseApplicationMutationVariables>;

/**
 * __usePauseApplicationMutation__
 *
 * To run a mutation, you first call `usePauseApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseApplicationMutation, { data, loading, error }] = usePauseApplicationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function usePauseApplicationMutation(baseOptions?: Apollo.MutationHookOptions<PauseApplicationMutation, PauseApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseApplicationMutation, PauseApplicationMutationVariables>(PauseApplicationDocument, options);
      }
export type PauseApplicationMutationHookResult = ReturnType<typeof usePauseApplicationMutation>;
export type PauseApplicationMutationResult = Apollo.MutationResult<PauseApplicationMutation>;
export type PauseApplicationMutationOptions = Apollo.BaseMutationOptions<PauseApplicationMutation, PauseApplicationMutationVariables>;
export const GetCategoryDocument = gql`
    query GetCategory($id: ID64!) {
  result: category(ID: $id) {
    clientMutationID
    categoryID
    data: category {
      ...__categoryData
    }
  }
}
    ${__CategoryDataFragmentDoc}`;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables> & ({ variables: GetCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export function useGetCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategorySuspenseQueryHookResult = ReturnType<typeof useGetCategorySuspenseQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const ListCategoriesDocument = gql`
    query ListCategories($page: Int! = 0, $size: Int! = 10, $filter: CategoryListFilter = null, $order: CategoryListOrder = null) {
  result: listCategories(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    list {
      ...__categoryData
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__CategoryDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListCategoriesQuery__
 *
 * To run a query within a React component, call `useListCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCategoriesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
      }
export function useListCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
        }
export function useListCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListCategoriesQuery, ListCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCategoriesQuery, ListCategoriesQueryVariables>(ListCategoriesDocument, options);
        }
export type ListCategoriesQueryHookResult = ReturnType<typeof useListCategoriesQuery>;
export type ListCategoriesLazyQueryHookResult = ReturnType<typeof useListCategoriesLazyQuery>;
export type ListCategoriesSuspenseQueryHookResult = ReturnType<typeof useListCategoriesSuspenseQuery>;
export type ListCategoriesQueryResult = Apollo.QueryResult<ListCategoriesQuery, ListCategoriesQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($input: CategoryInput!) {
  result: createCategory(input: $input) {
    clientMutationID
    categoryID
    data: category {
      ...__categoryData
    }
  }
}
    ${__CategoryDataFragmentDoc}`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: ID64!, $input: CategoryInput!) {
  result: updateCategory(ID: $id, input: $input) {
    clientMutationID
    categoryID
    data: category {
      ...__categoryData
    }
  }
}
    ${__CategoryDataFragmentDoc}`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const GetOsDocument = gql`
    query GetOS($id: ID64!) {
  result: OS(ID: $id) {
    clientMutationID
    data: OS {
      ...__osData
    }
  }
}
    ${__OsDataFragmentDoc}`;

/**
 * __useGetOsQuery__
 *
 * To run a query within a React component, call `useGetOsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOsQuery(baseOptions: Apollo.QueryHookOptions<GetOsQuery, GetOsQueryVariables> & ({ variables: GetOsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOsQuery, GetOsQueryVariables>(GetOsDocument, options);
      }
export function useGetOsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOsQuery, GetOsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOsQuery, GetOsQueryVariables>(GetOsDocument, options);
        }
export function useGetOsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOsQuery, GetOsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOsQuery, GetOsQueryVariables>(GetOsDocument, options);
        }
export type GetOsQueryHookResult = ReturnType<typeof useGetOsQuery>;
export type GetOsLazyQueryHookResult = ReturnType<typeof useGetOsLazyQuery>;
export type GetOsSuspenseQueryHookResult = ReturnType<typeof useGetOsSuspenseQuery>;
export type GetOsQueryResult = Apollo.QueryResult<GetOsQuery, GetOsQueryVariables>;
export const ListOsDocument = gql`
    query ListOS($page: Int! = 0, $size: Int! = 10, $filter: OSListFilter = null, $order: OSListOrder = null) {
  result: listOS(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    totalCount
    list {
      ...__osData
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__OsDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListOsQuery__
 *
 * To run a query within a React component, call `useListOsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListOsQuery(baseOptions?: Apollo.QueryHookOptions<ListOsQuery, ListOsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOsQuery, ListOsQueryVariables>(ListOsDocument, options);
      }
export function useListOsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOsQuery, ListOsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOsQuery, ListOsQueryVariables>(ListOsDocument, options);
        }
export function useListOsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOsQuery, ListOsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOsQuery, ListOsQueryVariables>(ListOsDocument, options);
        }
export type ListOsQueryHookResult = ReturnType<typeof useListOsQuery>;
export type ListOsLazyQueryHookResult = ReturnType<typeof useListOsLazyQuery>;
export type ListOsSuspenseQueryHookResult = ReturnType<typeof useListOsSuspenseQuery>;
export type ListOsQueryResult = Apollo.QueryResult<ListOsQuery, ListOsQueryVariables>;
export const CreateOsDocument = gql`
    mutation CreateOS($input: OSInput!) {
  result: createOS(input: $input) {
    clientMutationID
    data: OS {
      ...__osData
    }
  }
}
    ${__OsDataFragmentDoc}`;
export type CreateOsMutationFn = Apollo.MutationFunction<CreateOsMutation, CreateOsMutationVariables>;

/**
 * __useCreateOsMutation__
 *
 * To run a mutation, you first call `useCreateOsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOsMutation, { data, loading, error }] = useCreateOsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOsMutation(baseOptions?: Apollo.MutationHookOptions<CreateOsMutation, CreateOsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOsMutation, CreateOsMutationVariables>(CreateOsDocument, options);
      }
export type CreateOsMutationHookResult = ReturnType<typeof useCreateOsMutation>;
export type CreateOsMutationResult = Apollo.MutationResult<CreateOsMutation>;
export type CreateOsMutationOptions = Apollo.BaseMutationOptions<CreateOsMutation, CreateOsMutationVariables>;
export const UpdateOsDocument = gql`
    mutation UpdateOS($id: ID64!, $input: OSInput!) {
  result: updateOS(ID: $id, input: $input) {
    clientMutationID
    data: OS {
      ...__osData
    }
  }
}
    ${__OsDataFragmentDoc}`;
export type UpdateOsMutationFn = Apollo.MutationFunction<UpdateOsMutation, UpdateOsMutationVariables>;

/**
 * __useUpdateOsMutation__
 *
 * To run a mutation, you first call `useUpdateOsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOsMutation, { data, loading, error }] = useUpdateOsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOsMutation, UpdateOsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOsMutation, UpdateOsMutationVariables>(UpdateOsDocument, options);
      }
export type UpdateOsMutationHookResult = ReturnType<typeof useUpdateOsMutation>;
export type UpdateOsMutationResult = Apollo.MutationResult<UpdateOsMutation>;
export type UpdateOsMutationOptions = Apollo.BaseMutationOptions<UpdateOsMutation, UpdateOsMutationVariables>;
export const ListCountriesDocument = gql`
    query ListCountries {
  list: countries {
    ID
    name
    code2
    continentCode
  }
}
    `;

/**
 * __useListCountriesQuery__
 *
 * To run a query within a React component, call `useListCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListCountriesQuery(baseOptions?: Apollo.QueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, options);
      }
export function useListCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, options);
        }
export function useListCountriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListCountriesQuery, ListCountriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCountriesQuery, ListCountriesQueryVariables>(ListCountriesDocument, options);
        }
export type ListCountriesQueryHookResult = ReturnType<typeof useListCountriesQuery>;
export type ListCountriesLazyQueryHookResult = ReturnType<typeof useListCountriesLazyQuery>;
export type ListCountriesSuspenseQueryHookResult = ReturnType<typeof useListCountriesSuspenseQuery>;
export type ListCountriesQueryResult = Apollo.QueryResult<ListCountriesQuery, ListCountriesQueryVariables>;
export const GetAccountDocument = gql`
    query GetAccount($id: ID64!) {
  result: account(id: $id) {
    data: account {
      ...__accountData
    }
  }
}
    ${__AccountDataFragmentDoc}`;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables> & ({ variables: GetAccountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export function useGetAccountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountSuspenseQueryHookResult = ReturnType<typeof useGetAccountSuspenseQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export const GetAccountsDocument = gql`
    query GetAccounts($page: Int! = 0, $size: Int! = 10, $filter: AccountListFilter = null, $order: AccountListOrder = null) {
  result: listAccounts(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    list {
      ...__accountData
    }
    pageInfo {
      ...__pageInfo
    }
  }
  permApprove: checkPermission(name: "approve.*", key: "account")
  permReject: checkPermission(name: "reject.*", key: "account")
}
    ${__AccountDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
      }
export function useGetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export function useGetAccountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsSuspenseQueryHookResult = ReturnType<typeof useGetAccountsSuspenseQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<GetAccountsQuery, GetAccountsQueryVariables>;
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($id: ID64!, $data: AccountInput!) {
  updateAccount(id: $id, input: $data) {
    clientMutationID
    accountID
    account {
      ...__accountData
    }
  }
}
    ${__AccountDataFragmentDoc}`;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const RegisterAccountDocument = gql`
    mutation RegisterAccount($input: AccountCreateInput!) {
  registerAccount(input: $input) {
    clientMutationID
    account {
      ...__accountData
    }
    owner {
      ...__userData
    }
  }
}
    ${__AccountDataFragmentDoc}
${__UserDataFragmentDoc}`;
export type RegisterAccountMutationFn = Apollo.MutationFunction<RegisterAccountMutation, RegisterAccountMutationVariables>;

/**
 * __useRegisterAccountMutation__
 *
 * To run a mutation, you first call `useRegisterAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAccountMutation, { data, loading, error }] = useRegisterAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterAccountMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAccountMutation, RegisterAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAccountMutation, RegisterAccountMutationVariables>(RegisterAccountDocument, options);
      }
export type RegisterAccountMutationHookResult = ReturnType<typeof useRegisterAccountMutation>;
export type RegisterAccountMutationResult = Apollo.MutationResult<RegisterAccountMutation>;
export type RegisterAccountMutationOptions = Apollo.BaseMutationOptions<RegisterAccountMutation, RegisterAccountMutationVariables>;
export const ApproveAccountDocument = gql`
    mutation ApproveAccount($id: ID64!, $msg: String! = "") {
  approveAccount(id: $id, msg: $msg) {
    clientMutationID
  }
}
    `;
export type ApproveAccountMutationFn = Apollo.MutationFunction<ApproveAccountMutation, ApproveAccountMutationVariables>;

/**
 * __useApproveAccountMutation__
 *
 * To run a mutation, you first call `useApproveAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveAccountMutation, { data, loading, error }] = useApproveAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useApproveAccountMutation(baseOptions?: Apollo.MutationHookOptions<ApproveAccountMutation, ApproveAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveAccountMutation, ApproveAccountMutationVariables>(ApproveAccountDocument, options);
      }
export type ApproveAccountMutationHookResult = ReturnType<typeof useApproveAccountMutation>;
export type ApproveAccountMutationResult = Apollo.MutationResult<ApproveAccountMutation>;
export type ApproveAccountMutationOptions = Apollo.BaseMutationOptions<ApproveAccountMutation, ApproveAccountMutationVariables>;
export const RejectAccountDocument = gql`
    mutation RejectAccount($id: ID64!, $msg: String! = "") {
  rejectAccount(id: $id, msg: $msg) {
    clientMutationID
  }
}
    `;
export type RejectAccountMutationFn = Apollo.MutationFunction<RejectAccountMutation, RejectAccountMutationVariables>;

/**
 * __useRejectAccountMutation__
 *
 * To run a mutation, you first call `useRejectAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectAccountMutation, { data, loading, error }] = useRejectAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useRejectAccountMutation(baseOptions?: Apollo.MutationHookOptions<RejectAccountMutation, RejectAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectAccountMutation, RejectAccountMutationVariables>(RejectAccountDocument, options);
      }
export type RejectAccountMutationHookResult = ReturnType<typeof useRejectAccountMutation>;
export type RejectAccountMutationResult = Apollo.MutationResult<RejectAccountMutation>;
export type RejectAccountMutationOptions = Apollo.BaseMutationOptions<RejectAccountMutation, RejectAccountMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID64!) {
  result: user(id: $id) {
    user {
      ...__userData
    }
  }
}
    ${__UserDataFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($page: Int! = 0, $size: Int! = 10, $filter: UserListFilter = null, $order: UserListOrder = null) {
  result: listUsers(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    list {
      ...__userData
    }
    pageInfo {
      ...__pageInfo
    }
  }
  permApprove: checkPermission(name: "approve.*", key: "user")
  permReject: checkPermission(name: "reject.*", key: "user")
}
    ${__UserDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const ResetUserPasswordDocument = gql`
    mutation ResetUserPassword($email: String!) {
  resetUserPassword(email: $email) {
    status
    message
  }
}
    `;
export type ResetUserPasswordMutationFn = Apollo.MutationFunction<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>;

/**
 * __useResetUserPasswordMutation__
 *
 * To run a mutation, you first call `useResetUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetUserPasswordMutation, { data, loading, error }] = useResetUserPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>(ResetUserPasswordDocument, options);
      }
export type ResetUserPasswordMutationHookResult = ReturnType<typeof useResetUserPasswordMutation>;
export type ResetUserPasswordMutationResult = Apollo.MutationResult<ResetUserPasswordMutation>;
export type ResetUserPasswordMutationOptions = Apollo.BaseMutationOptions<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>;
export const UpdateUserPasswordDocument = gql`
    mutation UpdateUserPassword($token: String!, $email: String!, $password: String!) {
  updateUserPassword(token: $token, email: $email, password: $password) {
    status
    message
  }
}
    `;
export type UpdateUserPasswordMutationFn = Apollo.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = Apollo.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const ApproveUserDocument = gql`
    mutation ApproveUser($id: ID64!, $msg: String! = "") {
  approveUser(id: $id, msg: $msg) {
    clientMutationID
  }
}
    `;
export type ApproveUserMutationFn = Apollo.MutationFunction<ApproveUserMutation, ApproveUserMutationVariables>;

/**
 * __useApproveUserMutation__
 *
 * To run a mutation, you first call `useApproveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveUserMutation, { data, loading, error }] = useApproveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useApproveUserMutation(baseOptions?: Apollo.MutationHookOptions<ApproveUserMutation, ApproveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveUserMutation, ApproveUserMutationVariables>(ApproveUserDocument, options);
      }
export type ApproveUserMutationHookResult = ReturnType<typeof useApproveUserMutation>;
export type ApproveUserMutationResult = Apollo.MutationResult<ApproveUserMutation>;
export type ApproveUserMutationOptions = Apollo.BaseMutationOptions<ApproveUserMutation, ApproveUserMutationVariables>;
export const RejectUserDocument = gql`
    mutation RejectUser($id: ID64!, $msg: String! = "") {
  rejectUser(id: $id, msg: $msg) {
    clientMutationID
  }
}
    `;
export type RejectUserMutationFn = Apollo.MutationFunction<RejectUserMutation, RejectUserMutationVariables>;

/**
 * __useRejectUserMutation__
 *
 * To run a mutation, you first call `useRejectUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectUserMutation, { data, loading, error }] = useRejectUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useRejectUserMutation(baseOptions?: Apollo.MutationHookOptions<RejectUserMutation, RejectUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectUserMutation, RejectUserMutationVariables>(RejectUserDocument, options);
      }
export type RejectUserMutationHookResult = ReturnType<typeof useRejectUserMutation>;
export type RejectUserMutationResult = Apollo.MutationResult<RejectUserMutation>;
export type RejectUserMutationOptions = Apollo.BaseMutationOptions<RejectUserMutation, RejectUserMutationVariables>;
export const GetMembersDocument = gql`
    query GetMembers($page: Int! = 0, $size: Int! = 10, $filter: MemberListFilter = null, $order: MemberListOrder = null) {
  result: listMembers(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    totalCount
    list {
      ...__memberData
    }
    pageInfo {
      ...__pageInfo
    }
  }
  roles: listRoles @skipNoPermissions(permissions: ["account.member.update.*", "account.member.roles.set.*"]) {
    list {
      ID
      title
      name
    }
  }
  permApprove: checkPermission(name: "approve.*", key: "account.member")
  permReject: checkPermission(name: "reject.*", key: "account.member")
  permUpdate: checkPermission(name: "update.*", key: "account.member")
}
    ${__MemberDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
      }
export function useGetMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
        }
export function useGetMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options);
        }
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersSuspenseQueryHookResult = ReturnType<typeof useGetMembersSuspenseQuery>;
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>;
export const UpdateMemberDocument = gql`
    mutation UpdateMember($id: ID64!, $data: MemberInput!) {
  updateAccountMember(memberID: $id, member: $data) {
    clientMutationID
    memberID
    member {
      ...__memberData
    }
  }
}
    ${__MemberDataFragmentDoc}`;
export type UpdateMemberMutationFn = Apollo.MutationFunction<UpdateMemberMutation, UpdateMemberMutationVariables>;

/**
 * __useUpdateMemberMutation__
 *
 * To run a mutation, you first call `useUpdateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemberMutation, { data, loading, error }] = useUpdateMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMemberMutation, UpdateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument, options);
      }
export type UpdateMemberMutationHookResult = ReturnType<typeof useUpdateMemberMutation>;
export type UpdateMemberMutationResult = Apollo.MutationResult<UpdateMemberMutation>;
export type UpdateMemberMutationOptions = Apollo.BaseMutationOptions<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const GetCurrentSocialAccountsDocument = gql`
    query GetCurrentSocialAccounts($filter: SocialAccountListFilter = null) {
  result: currentSocialAccounts(filter: $filter) {
    list {
      ...__socialAccountData
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__SocialAccountDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useGetCurrentSocialAccountsQuery__
 *
 * To run a query within a React component, call `useGetCurrentSocialAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentSocialAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentSocialAccountsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCurrentSocialAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentSocialAccountsQuery, GetCurrentSocialAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentSocialAccountsQuery, GetCurrentSocialAccountsQueryVariables>(GetCurrentSocialAccountsDocument, options);
      }
export function useGetCurrentSocialAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentSocialAccountsQuery, GetCurrentSocialAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentSocialAccountsQuery, GetCurrentSocialAccountsQueryVariables>(GetCurrentSocialAccountsDocument, options);
        }
export function useGetCurrentSocialAccountsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentSocialAccountsQuery, GetCurrentSocialAccountsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentSocialAccountsQuery, GetCurrentSocialAccountsQueryVariables>(GetCurrentSocialAccountsDocument, options);
        }
export type GetCurrentSocialAccountsQueryHookResult = ReturnType<typeof useGetCurrentSocialAccountsQuery>;
export type GetCurrentSocialAccountsLazyQueryHookResult = ReturnType<typeof useGetCurrentSocialAccountsLazyQuery>;
export type GetCurrentSocialAccountsSuspenseQueryHookResult = ReturnType<typeof useGetCurrentSocialAccountsSuspenseQuery>;
export type GetCurrentSocialAccountsQueryResult = Apollo.QueryResult<GetCurrentSocialAccountsQuery, GetCurrentSocialAccountsQueryVariables>;
export const DisconnectSocialAccountDocument = gql`
    mutation DisconnectSocialAccount($id: ID64!) {
  result: disconnectSocialAccount(id: $id) {
    clientMutationID
  }
}
    `;
export type DisconnectSocialAccountMutationFn = Apollo.MutationFunction<DisconnectSocialAccountMutation, DisconnectSocialAccountMutationVariables>;

/**
 * __useDisconnectSocialAccountMutation__
 *
 * To run a mutation, you first call `useDisconnectSocialAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectSocialAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectSocialAccountMutation, { data, loading, error }] = useDisconnectSocialAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDisconnectSocialAccountMutation(baseOptions?: Apollo.MutationHookOptions<DisconnectSocialAccountMutation, DisconnectSocialAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisconnectSocialAccountMutation, DisconnectSocialAccountMutationVariables>(DisconnectSocialAccountDocument, options);
      }
export type DisconnectSocialAccountMutationHookResult = ReturnType<typeof useDisconnectSocialAccountMutation>;
export type DisconnectSocialAccountMutationResult = Apollo.MutationResult<DisconnectSocialAccountMutation>;
export type DisconnectSocialAccountMutationOptions = Apollo.BaseMutationOptions<DisconnectSocialAccountMutation, DisconnectSocialAccountMutationVariables>;
export const ListPermissionsDocument = gql`
    query ListPermissions($patterns: [String!] = null) {
  all: listPermissions(patterns: $patterns) {
    ...__permData
  }
  my: listMyPermissions(patterns: $patterns) {
    ...__permData
  }
}
    ${__PermDataFragmentDoc}`;

/**
 * __useListPermissionsQuery__
 *
 * To run a query within a React component, call `useListPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPermissionsQuery({
 *   variables: {
 *      patterns: // value for 'patterns'
 *   },
 * });
 */
export function useListPermissionsQuery(baseOptions?: Apollo.QueryHookOptions<ListPermissionsQuery, ListPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPermissionsQuery, ListPermissionsQueryVariables>(ListPermissionsDocument, options);
      }
export function useListPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPermissionsQuery, ListPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPermissionsQuery, ListPermissionsQueryVariables>(ListPermissionsDocument, options);
        }
export function useListPermissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListPermissionsQuery, ListPermissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListPermissionsQuery, ListPermissionsQueryVariables>(ListPermissionsDocument, options);
        }
export type ListPermissionsQueryHookResult = ReturnType<typeof useListPermissionsQuery>;
export type ListPermissionsLazyQueryHookResult = ReturnType<typeof useListPermissionsLazyQuery>;
export type ListPermissionsSuspenseQueryHookResult = ReturnType<typeof useListPermissionsSuspenseQuery>;
export type ListPermissionsQueryResult = Apollo.QueryResult<ListPermissionsQuery, ListPermissionsQueryVariables>;
export const ListDirectAccessTokensDocument = gql`
    query ListDirectAccessTokens($expiresAt: Time = null) {
  tokens: listDirectAccessTokens(
    filter: {minExpiresAt: $expiresAt}
    order: {createdAt: DESC}
    page: {size: 100}
  ) {
    list {
      ID
      token
      description
      userID
      accountID
      expiresAt
    }
  }
}
    `;

/**
 * __useListDirectAccessTokensQuery__
 *
 * To run a query within a React component, call `useListDirectAccessTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDirectAccessTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDirectAccessTokensQuery({
 *   variables: {
 *      expiresAt: // value for 'expiresAt'
 *   },
 * });
 */
export function useListDirectAccessTokensQuery(baseOptions?: Apollo.QueryHookOptions<ListDirectAccessTokensQuery, ListDirectAccessTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDirectAccessTokensQuery, ListDirectAccessTokensQueryVariables>(ListDirectAccessTokensDocument, options);
      }
export function useListDirectAccessTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDirectAccessTokensQuery, ListDirectAccessTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDirectAccessTokensQuery, ListDirectAccessTokensQueryVariables>(ListDirectAccessTokensDocument, options);
        }
export function useListDirectAccessTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDirectAccessTokensQuery, ListDirectAccessTokensQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDirectAccessTokensQuery, ListDirectAccessTokensQueryVariables>(ListDirectAccessTokensDocument, options);
        }
export type ListDirectAccessTokensQueryHookResult = ReturnType<typeof useListDirectAccessTokensQuery>;
export type ListDirectAccessTokensLazyQueryHookResult = ReturnType<typeof useListDirectAccessTokensLazyQuery>;
export type ListDirectAccessTokensSuspenseQueryHookResult = ReturnType<typeof useListDirectAccessTokensSuspenseQuery>;
export type ListDirectAccessTokensQueryResult = Apollo.QueryResult<ListDirectAccessTokensQuery, ListDirectAccessTokensQueryVariables>;
export const GenerateDirectAccessTokenDocument = gql`
    mutation GenerateDirectAccessToken($userID: ID64 = null, $expiresAt: Time = null) {
  result: generateDirectAccessToken(userID: $userID, expiresAt: $expiresAt) {
    clientMutationID
    token {
      ID
      token
      description
      userID
      accountID
      expiresAt
    }
  }
}
    `;
export type GenerateDirectAccessTokenMutationFn = Apollo.MutationFunction<GenerateDirectAccessTokenMutation, GenerateDirectAccessTokenMutationVariables>;

/**
 * __useGenerateDirectAccessTokenMutation__
 *
 * To run a mutation, you first call `useGenerateDirectAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateDirectAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateDirectAccessTokenMutation, { data, loading, error }] = useGenerateDirectAccessTokenMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      expiresAt: // value for 'expiresAt'
 *   },
 * });
 */
export function useGenerateDirectAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateDirectAccessTokenMutation, GenerateDirectAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateDirectAccessTokenMutation, GenerateDirectAccessTokenMutationVariables>(GenerateDirectAccessTokenDocument, options);
      }
export type GenerateDirectAccessTokenMutationHookResult = ReturnType<typeof useGenerateDirectAccessTokenMutation>;
export type GenerateDirectAccessTokenMutationResult = Apollo.MutationResult<GenerateDirectAccessTokenMutation>;
export type GenerateDirectAccessTokenMutationOptions = Apollo.BaseMutationOptions<GenerateDirectAccessTokenMutation, GenerateDirectAccessTokenMutationVariables>;
export const RevokeDirectAccessTokenDocument = gql`
    mutation RevokeDirectAccessToken($id: ID64!) {
  result: revokeDirectAccessToken(filter: {ID: [$id]}) {
    clientMutationID
    status
  }
}
    `;
export type RevokeDirectAccessTokenMutationFn = Apollo.MutationFunction<RevokeDirectAccessTokenMutation, RevokeDirectAccessTokenMutationVariables>;

/**
 * __useRevokeDirectAccessTokenMutation__
 *
 * To run a mutation, you first call `useRevokeDirectAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeDirectAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeDirectAccessTokenMutation, { data, loading, error }] = useRevokeDirectAccessTokenMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRevokeDirectAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<RevokeDirectAccessTokenMutation, RevokeDirectAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeDirectAccessTokenMutation, RevokeDirectAccessTokenMutationVariables>(RevokeDirectAccessTokenDocument, options);
      }
export type RevokeDirectAccessTokenMutationHookResult = ReturnType<typeof useRevokeDirectAccessTokenMutation>;
export type RevokeDirectAccessTokenMutationResult = Apollo.MutationResult<RevokeDirectAccessTokenMutation>;
export type RevokeDirectAccessTokenMutationOptions = Apollo.BaseMutationOptions<RevokeDirectAccessTokenMutation, RevokeDirectAccessTokenMutationVariables>;
export const GetRtbSourceDocument = gql`
    query GetRTBSource($id: ID64!) {
  result: RTBSource(ID: $id) {
    clientMutationID
    data: source {
      ...__rtbSourceData
    }
  }
}
    ${__RtbSourceDataFragmentDoc}`;

/**
 * __useGetRtbSourceQuery__
 *
 * To run a query within a React component, call `useGetRtbSourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRtbSourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRtbSourceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRtbSourceQuery(baseOptions: Apollo.QueryHookOptions<GetRtbSourceQuery, GetRtbSourceQueryVariables> & ({ variables: GetRtbSourceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRtbSourceQuery, GetRtbSourceQueryVariables>(GetRtbSourceDocument, options);
      }
export function useGetRtbSourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRtbSourceQuery, GetRtbSourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRtbSourceQuery, GetRtbSourceQueryVariables>(GetRtbSourceDocument, options);
        }
export function useGetRtbSourceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRtbSourceQuery, GetRtbSourceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRtbSourceQuery, GetRtbSourceQueryVariables>(GetRtbSourceDocument, options);
        }
export type GetRtbSourceQueryHookResult = ReturnType<typeof useGetRtbSourceQuery>;
export type GetRtbSourceLazyQueryHookResult = ReturnType<typeof useGetRtbSourceLazyQuery>;
export type GetRtbSourceSuspenseQueryHookResult = ReturnType<typeof useGetRtbSourceSuspenseQuery>;
export type GetRtbSourceQueryResult = Apollo.QueryResult<GetRtbSourceQuery, GetRtbSourceQueryVariables>;
export const ListRtbSourcesDocument = gql`
    query ListRTBSources($page: Int! = 0, $size: Int! = 10, $filter: RTBSourceListFilter = null, $order: RTBSourceListOrder = null) {
  result: listRTBSources(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    list {
      ...__rtbSourceData
    }
    pageInfo {
      ...__pageInfo
    }
  }
  permApprove: checkPermission(name: "approve.*", key: "rtb_source")
  permReject: checkPermission(name: "reject.*", key: "rtb_source")
}
    ${__RtbSourceDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListRtbSourcesQuery__
 *
 * To run a query within a React component, call `useListRtbSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRtbSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRtbSourcesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListRtbSourcesQuery(baseOptions?: Apollo.QueryHookOptions<ListRtbSourcesQuery, ListRtbSourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRtbSourcesQuery, ListRtbSourcesQueryVariables>(ListRtbSourcesDocument, options);
      }
export function useListRtbSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRtbSourcesQuery, ListRtbSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRtbSourcesQuery, ListRtbSourcesQueryVariables>(ListRtbSourcesDocument, options);
        }
export function useListRtbSourcesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListRtbSourcesQuery, ListRtbSourcesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListRtbSourcesQuery, ListRtbSourcesQueryVariables>(ListRtbSourcesDocument, options);
        }
export type ListRtbSourcesQueryHookResult = ReturnType<typeof useListRtbSourcesQuery>;
export type ListRtbSourcesLazyQueryHookResult = ReturnType<typeof useListRtbSourcesLazyQuery>;
export type ListRtbSourcesSuspenseQueryHookResult = ReturnType<typeof useListRtbSourcesSuspenseQuery>;
export type ListRtbSourcesQueryResult = Apollo.QueryResult<ListRtbSourcesQuery, ListRtbSourcesQueryVariables>;
export const NewRtbSourceDocument = gql`
    mutation NewRTBSource($input: RTBSourceInput!) {
  result: createRTBSource(input: $input) {
    clientMutationID
    sourceID
    data: source {
      ...__rtbSourceData
    }
  }
}
    ${__RtbSourceDataFragmentDoc}`;
export type NewRtbSourceMutationFn = Apollo.MutationFunction<NewRtbSourceMutation, NewRtbSourceMutationVariables>;

/**
 * __useNewRtbSourceMutation__
 *
 * To run a mutation, you first call `useNewRtbSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewRtbSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newRtbSourceMutation, { data, loading, error }] = useNewRtbSourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewRtbSourceMutation(baseOptions?: Apollo.MutationHookOptions<NewRtbSourceMutation, NewRtbSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewRtbSourceMutation, NewRtbSourceMutationVariables>(NewRtbSourceDocument, options);
      }
export type NewRtbSourceMutationHookResult = ReturnType<typeof useNewRtbSourceMutation>;
export type NewRtbSourceMutationResult = Apollo.MutationResult<NewRtbSourceMutation>;
export type NewRtbSourceMutationOptions = Apollo.BaseMutationOptions<NewRtbSourceMutation, NewRtbSourceMutationVariables>;
export const UpdateRtbSourceDocument = gql`
    mutation UpdateRTBSource($id: ID64!, $input: RTBSourceInput!) {
  result: updateRTBSource(ID: $id, input: $input) {
    clientMutationID
    sourceID
    data: source {
      ...__rtbSourceData
    }
  }
}
    ${__RtbSourceDataFragmentDoc}`;
export type UpdateRtbSourceMutationFn = Apollo.MutationFunction<UpdateRtbSourceMutation, UpdateRtbSourceMutationVariables>;

/**
 * __useUpdateRtbSourceMutation__
 *
 * To run a mutation, you first call `useUpdateRtbSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRtbSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRtbSourceMutation, { data, loading, error }] = useUpdateRtbSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRtbSourceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRtbSourceMutation, UpdateRtbSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRtbSourceMutation, UpdateRtbSourceMutationVariables>(UpdateRtbSourceDocument, options);
      }
export type UpdateRtbSourceMutationHookResult = ReturnType<typeof useUpdateRtbSourceMutation>;
export type UpdateRtbSourceMutationResult = Apollo.MutationResult<UpdateRtbSourceMutation>;
export type UpdateRtbSourceMutationOptions = Apollo.BaseMutationOptions<UpdateRtbSourceMutation, UpdateRtbSourceMutationVariables>;
export const DeleteRtbSourceDocument = gql`
    mutation DeleteRTBSource($id: ID64!) {
  result: deleteRTBSource(ID: $id) {
    clientMutationID
  }
}
    `;
export type DeleteRtbSourceMutationFn = Apollo.MutationFunction<DeleteRtbSourceMutation, DeleteRtbSourceMutationVariables>;

/**
 * __useDeleteRtbSourceMutation__
 *
 * To run a mutation, you first call `useDeleteRtbSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRtbSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRtbSourceMutation, { data, loading, error }] = useDeleteRtbSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRtbSourceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRtbSourceMutation, DeleteRtbSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRtbSourceMutation, DeleteRtbSourceMutationVariables>(DeleteRtbSourceDocument, options);
      }
export type DeleteRtbSourceMutationHookResult = ReturnType<typeof useDeleteRtbSourceMutation>;
export type DeleteRtbSourceMutationResult = Apollo.MutationResult<DeleteRtbSourceMutation>;
export type DeleteRtbSourceMutationOptions = Apollo.BaseMutationOptions<DeleteRtbSourceMutation, DeleteRtbSourceMutationVariables>;
export const RunRtbSourceDocument = gql`
    mutation RunRTBSource($id: ID64!) {
  result: runRTBSource(ID: $id) {
    clientMutationID
    status
  }
}
    `;
export type RunRtbSourceMutationFn = Apollo.MutationFunction<RunRtbSourceMutation, RunRtbSourceMutationVariables>;

/**
 * __useRunRtbSourceMutation__
 *
 * To run a mutation, you first call `useRunRtbSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunRtbSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runRtbSourceMutation, { data, loading, error }] = useRunRtbSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRunRtbSourceMutation(baseOptions?: Apollo.MutationHookOptions<RunRtbSourceMutation, RunRtbSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunRtbSourceMutation, RunRtbSourceMutationVariables>(RunRtbSourceDocument, options);
      }
export type RunRtbSourceMutationHookResult = ReturnType<typeof useRunRtbSourceMutation>;
export type RunRtbSourceMutationResult = Apollo.MutationResult<RunRtbSourceMutation>;
export type RunRtbSourceMutationOptions = Apollo.BaseMutationOptions<RunRtbSourceMutation, RunRtbSourceMutationVariables>;
export const PauseRtbSourceDocument = gql`
    mutation PauseRTBSource($id: ID64!) {
  result: pauseRTBSource(ID: $id) {
    clientMutationID
    status
  }
}
    `;
export type PauseRtbSourceMutationFn = Apollo.MutationFunction<PauseRtbSourceMutation, PauseRtbSourceMutationVariables>;

/**
 * __usePauseRtbSourceMutation__
 *
 * To run a mutation, you first call `usePauseRtbSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseRtbSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseRtbSourceMutation, { data, loading, error }] = usePauseRtbSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePauseRtbSourceMutation(baseOptions?: Apollo.MutationHookOptions<PauseRtbSourceMutation, PauseRtbSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseRtbSourceMutation, PauseRtbSourceMutationVariables>(PauseRtbSourceDocument, options);
      }
export type PauseRtbSourceMutationHookResult = ReturnType<typeof usePauseRtbSourceMutation>;
export type PauseRtbSourceMutationResult = Apollo.MutationResult<PauseRtbSourceMutation>;
export type PauseRtbSourceMutationOptions = Apollo.BaseMutationOptions<PauseRtbSourceMutation, PauseRtbSourceMutationVariables>;
export const ApproveRtbSourceDocument = gql`
    mutation ApproveRTBSource($id: ID64!, $msg: String = null) {
  result: approveRTBSource(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type ApproveRtbSourceMutationFn = Apollo.MutationFunction<ApproveRtbSourceMutation, ApproveRtbSourceMutationVariables>;

/**
 * __useApproveRtbSourceMutation__
 *
 * To run a mutation, you first call `useApproveRtbSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveRtbSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveRtbSourceMutation, { data, loading, error }] = useApproveRtbSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useApproveRtbSourceMutation(baseOptions?: Apollo.MutationHookOptions<ApproveRtbSourceMutation, ApproveRtbSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveRtbSourceMutation, ApproveRtbSourceMutationVariables>(ApproveRtbSourceDocument, options);
      }
export type ApproveRtbSourceMutationHookResult = ReturnType<typeof useApproveRtbSourceMutation>;
export type ApproveRtbSourceMutationResult = Apollo.MutationResult<ApproveRtbSourceMutation>;
export type ApproveRtbSourceMutationOptions = Apollo.BaseMutationOptions<ApproveRtbSourceMutation, ApproveRtbSourceMutationVariables>;
export const RejectRtbSourceDocument = gql`
    mutation RejectRTBSource($id: ID64!, $msg: String = null) {
  result: rejectRTBSource(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type RejectRtbSourceMutationFn = Apollo.MutationFunction<RejectRtbSourceMutation, RejectRtbSourceMutationVariables>;

/**
 * __useRejectRtbSourceMutation__
 *
 * To run a mutation, you first call `useRejectRtbSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectRtbSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectRtbSourceMutation, { data, loading, error }] = useRejectRtbSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useRejectRtbSourceMutation(baseOptions?: Apollo.MutationHookOptions<RejectRtbSourceMutation, RejectRtbSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectRtbSourceMutation, RejectRtbSourceMutationVariables>(RejectRtbSourceDocument, options);
      }
export type RejectRtbSourceMutationHookResult = ReturnType<typeof useRejectRtbSourceMutation>;
export type RejectRtbSourceMutationResult = Apollo.MutationResult<RejectRtbSourceMutation>;
export type RejectRtbSourceMutationOptions = Apollo.BaseMutationOptions<RejectRtbSourceMutation, RejectRtbSourceMutationVariables>;
export const GetRtbAccessPointDocument = gql`
    query GetRTBAccessPoint($id: ID64!) {
  result: RTBAccessPoint(ID: $id) {
    clientMutationID
    data: accessPoint {
      ...__rtbAccessPointData
    }
  }
}
    ${__RtbAccessPointDataFragmentDoc}`;

/**
 * __useGetRtbAccessPointQuery__
 *
 * To run a query within a React component, call `useGetRtbAccessPointQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRtbAccessPointQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRtbAccessPointQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRtbAccessPointQuery(baseOptions: Apollo.QueryHookOptions<GetRtbAccessPointQuery, GetRtbAccessPointQueryVariables> & ({ variables: GetRtbAccessPointQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRtbAccessPointQuery, GetRtbAccessPointQueryVariables>(GetRtbAccessPointDocument, options);
      }
export function useGetRtbAccessPointLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRtbAccessPointQuery, GetRtbAccessPointQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRtbAccessPointQuery, GetRtbAccessPointQueryVariables>(GetRtbAccessPointDocument, options);
        }
export function useGetRtbAccessPointSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRtbAccessPointQuery, GetRtbAccessPointQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRtbAccessPointQuery, GetRtbAccessPointQueryVariables>(GetRtbAccessPointDocument, options);
        }
export type GetRtbAccessPointQueryHookResult = ReturnType<typeof useGetRtbAccessPointQuery>;
export type GetRtbAccessPointLazyQueryHookResult = ReturnType<typeof useGetRtbAccessPointLazyQuery>;
export type GetRtbAccessPointSuspenseQueryHookResult = ReturnType<typeof useGetRtbAccessPointSuspenseQuery>;
export type GetRtbAccessPointQueryResult = Apollo.QueryResult<GetRtbAccessPointQuery, GetRtbAccessPointQueryVariables>;
export const ListRtbAccessPointsDocument = gql`
    query ListRTBAccessPoints($page: Int! = 0, $size: Int! = 10, $filter: RTBAccessPointListFilter = null, $order: RTBAccessPointListOrder = null) {
  result: listRTBAccessPoints(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    list {
      ...__rtbAccessPointData
    }
    pageInfo {
      ...__pageInfo
    }
  }
  permApprove: checkPermission(name: "approve.*", key: "rtb_access_point")
  permReject: checkPermission(name: "reject.*", key: "rtb_access_point")
}
    ${__RtbAccessPointDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListRtbAccessPointsQuery__
 *
 * To run a query within a React component, call `useListRtbAccessPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRtbAccessPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRtbAccessPointsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListRtbAccessPointsQuery(baseOptions?: Apollo.QueryHookOptions<ListRtbAccessPointsQuery, ListRtbAccessPointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRtbAccessPointsQuery, ListRtbAccessPointsQueryVariables>(ListRtbAccessPointsDocument, options);
      }
export function useListRtbAccessPointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRtbAccessPointsQuery, ListRtbAccessPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRtbAccessPointsQuery, ListRtbAccessPointsQueryVariables>(ListRtbAccessPointsDocument, options);
        }
export function useListRtbAccessPointsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListRtbAccessPointsQuery, ListRtbAccessPointsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListRtbAccessPointsQuery, ListRtbAccessPointsQueryVariables>(ListRtbAccessPointsDocument, options);
        }
export type ListRtbAccessPointsQueryHookResult = ReturnType<typeof useListRtbAccessPointsQuery>;
export type ListRtbAccessPointsLazyQueryHookResult = ReturnType<typeof useListRtbAccessPointsLazyQuery>;
export type ListRtbAccessPointsSuspenseQueryHookResult = ReturnType<typeof useListRtbAccessPointsSuspenseQuery>;
export type ListRtbAccessPointsQueryResult = Apollo.QueryResult<ListRtbAccessPointsQuery, ListRtbAccessPointsQueryVariables>;
export const NewRtbAccessPointDocument = gql`
    mutation NewRTBAccessPoint($input: RTBAccessPointInput!) {
  result: createRTBAccessPoint(input: $input) {
    clientMutationID
    accessPointID
    data: accessPoint {
      ...__rtbAccessPointData
    }
  }
}
    ${__RtbAccessPointDataFragmentDoc}`;
export type NewRtbAccessPointMutationFn = Apollo.MutationFunction<NewRtbAccessPointMutation, NewRtbAccessPointMutationVariables>;

/**
 * __useNewRtbAccessPointMutation__
 *
 * To run a mutation, you first call `useNewRtbAccessPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewRtbAccessPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newRtbAccessPointMutation, { data, loading, error }] = useNewRtbAccessPointMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewRtbAccessPointMutation(baseOptions?: Apollo.MutationHookOptions<NewRtbAccessPointMutation, NewRtbAccessPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewRtbAccessPointMutation, NewRtbAccessPointMutationVariables>(NewRtbAccessPointDocument, options);
      }
export type NewRtbAccessPointMutationHookResult = ReturnType<typeof useNewRtbAccessPointMutation>;
export type NewRtbAccessPointMutationResult = Apollo.MutationResult<NewRtbAccessPointMutation>;
export type NewRtbAccessPointMutationOptions = Apollo.BaseMutationOptions<NewRtbAccessPointMutation, NewRtbAccessPointMutationVariables>;
export const UpdateRtbAccessPointDocument = gql`
    mutation UpdateRTBAccessPoint($id: ID64!, $input: RTBAccessPointInput!) {
  result: updateRTBAccessPoint(ID: $id, input: $input) {
    clientMutationID
    accessPointID
    data: accessPoint {
      ...__rtbAccessPointData
    }
  }
}
    ${__RtbAccessPointDataFragmentDoc}`;
export type UpdateRtbAccessPointMutationFn = Apollo.MutationFunction<UpdateRtbAccessPointMutation, UpdateRtbAccessPointMutationVariables>;

/**
 * __useUpdateRtbAccessPointMutation__
 *
 * To run a mutation, you first call `useUpdateRtbAccessPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRtbAccessPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRtbAccessPointMutation, { data, loading, error }] = useUpdateRtbAccessPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRtbAccessPointMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRtbAccessPointMutation, UpdateRtbAccessPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRtbAccessPointMutation, UpdateRtbAccessPointMutationVariables>(UpdateRtbAccessPointDocument, options);
      }
export type UpdateRtbAccessPointMutationHookResult = ReturnType<typeof useUpdateRtbAccessPointMutation>;
export type UpdateRtbAccessPointMutationResult = Apollo.MutationResult<UpdateRtbAccessPointMutation>;
export type UpdateRtbAccessPointMutationOptions = Apollo.BaseMutationOptions<UpdateRtbAccessPointMutation, UpdateRtbAccessPointMutationVariables>;
export const DeleteRtbAccessPointDocument = gql`
    mutation DeleteRTBAccessPoint($id: ID64!) {
  result: deleteRTBAccessPoint(ID: $id) {
    clientMutationID
  }
}
    `;
export type DeleteRtbAccessPointMutationFn = Apollo.MutationFunction<DeleteRtbAccessPointMutation, DeleteRtbAccessPointMutationVariables>;

/**
 * __useDeleteRtbAccessPointMutation__
 *
 * To run a mutation, you first call `useDeleteRtbAccessPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRtbAccessPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRtbAccessPointMutation, { data, loading, error }] = useDeleteRtbAccessPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRtbAccessPointMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRtbAccessPointMutation, DeleteRtbAccessPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRtbAccessPointMutation, DeleteRtbAccessPointMutationVariables>(DeleteRtbAccessPointDocument, options);
      }
export type DeleteRtbAccessPointMutationHookResult = ReturnType<typeof useDeleteRtbAccessPointMutation>;
export type DeleteRtbAccessPointMutationResult = Apollo.MutationResult<DeleteRtbAccessPointMutation>;
export type DeleteRtbAccessPointMutationOptions = Apollo.BaseMutationOptions<DeleteRtbAccessPointMutation, DeleteRtbAccessPointMutationVariables>;
export const RunRtbAccessPointDocument = gql`
    mutation RunRTBAccessPoint($id: ID64!) {
  result: runRTBAccessPoint(ID: $id) {
    clientMutationID
    status
  }
}
    `;
export type RunRtbAccessPointMutationFn = Apollo.MutationFunction<RunRtbAccessPointMutation, RunRtbAccessPointMutationVariables>;

/**
 * __useRunRtbAccessPointMutation__
 *
 * To run a mutation, you first call `useRunRtbAccessPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunRtbAccessPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runRtbAccessPointMutation, { data, loading, error }] = useRunRtbAccessPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRunRtbAccessPointMutation(baseOptions?: Apollo.MutationHookOptions<RunRtbAccessPointMutation, RunRtbAccessPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunRtbAccessPointMutation, RunRtbAccessPointMutationVariables>(RunRtbAccessPointDocument, options);
      }
export type RunRtbAccessPointMutationHookResult = ReturnType<typeof useRunRtbAccessPointMutation>;
export type RunRtbAccessPointMutationResult = Apollo.MutationResult<RunRtbAccessPointMutation>;
export type RunRtbAccessPointMutationOptions = Apollo.BaseMutationOptions<RunRtbAccessPointMutation, RunRtbAccessPointMutationVariables>;
export const PauseRtbAccessPointDocument = gql`
    mutation PauseRTBAccessPoint($id: ID64!) {
  result: pauseRTBAccessPoint(ID: $id) {
    clientMutationID
    status
  }
}
    `;
export type PauseRtbAccessPointMutationFn = Apollo.MutationFunction<PauseRtbAccessPointMutation, PauseRtbAccessPointMutationVariables>;

/**
 * __usePauseRtbAccessPointMutation__
 *
 * To run a mutation, you first call `usePauseRtbAccessPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseRtbAccessPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseRtbAccessPointMutation, { data, loading, error }] = usePauseRtbAccessPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePauseRtbAccessPointMutation(baseOptions?: Apollo.MutationHookOptions<PauseRtbAccessPointMutation, PauseRtbAccessPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseRtbAccessPointMutation, PauseRtbAccessPointMutationVariables>(PauseRtbAccessPointDocument, options);
      }
export type PauseRtbAccessPointMutationHookResult = ReturnType<typeof usePauseRtbAccessPointMutation>;
export type PauseRtbAccessPointMutationResult = Apollo.MutationResult<PauseRtbAccessPointMutation>;
export type PauseRtbAccessPointMutationOptions = Apollo.BaseMutationOptions<PauseRtbAccessPointMutation, PauseRtbAccessPointMutationVariables>;
export const ApproveRtbAccessPointDocument = gql`
    mutation ApproveRTBAccessPoint($id: ID64!, $msg: String = null) {
  result: approveRTBAccessPoint(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type ApproveRtbAccessPointMutationFn = Apollo.MutationFunction<ApproveRtbAccessPointMutation, ApproveRtbAccessPointMutationVariables>;

/**
 * __useApproveRtbAccessPointMutation__
 *
 * To run a mutation, you first call `useApproveRtbAccessPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveRtbAccessPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveRtbAccessPointMutation, { data, loading, error }] = useApproveRtbAccessPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useApproveRtbAccessPointMutation(baseOptions?: Apollo.MutationHookOptions<ApproveRtbAccessPointMutation, ApproveRtbAccessPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveRtbAccessPointMutation, ApproveRtbAccessPointMutationVariables>(ApproveRtbAccessPointDocument, options);
      }
export type ApproveRtbAccessPointMutationHookResult = ReturnType<typeof useApproveRtbAccessPointMutation>;
export type ApproveRtbAccessPointMutationResult = Apollo.MutationResult<ApproveRtbAccessPointMutation>;
export type ApproveRtbAccessPointMutationOptions = Apollo.BaseMutationOptions<ApproveRtbAccessPointMutation, ApproveRtbAccessPointMutationVariables>;
export const RejectRtbAccessPointDocument = gql`
    mutation RejectRTBAccessPoint($id: ID64!, $msg: String = null) {
  result: rejectRTBAccessPoint(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type RejectRtbAccessPointMutationFn = Apollo.MutationFunction<RejectRtbAccessPointMutation, RejectRtbAccessPointMutationVariables>;

/**
 * __useRejectRtbAccessPointMutation__
 *
 * To run a mutation, you first call `useRejectRtbAccessPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectRtbAccessPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectRtbAccessPointMutation, { data, loading, error }] = useRejectRtbAccessPointMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useRejectRtbAccessPointMutation(baseOptions?: Apollo.MutationHookOptions<RejectRtbAccessPointMutation, RejectRtbAccessPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectRtbAccessPointMutation, RejectRtbAccessPointMutationVariables>(RejectRtbAccessPointDocument, options);
      }
export type RejectRtbAccessPointMutationHookResult = ReturnType<typeof useRejectRtbAccessPointMutation>;
export type RejectRtbAccessPointMutationResult = Apollo.MutationResult<RejectRtbAccessPointMutation>;
export type RejectRtbAccessPointMutationOptions = Apollo.BaseMutationOptions<RejectRtbAccessPointMutation, RejectRtbAccessPointMutationVariables>;
export const GetBrowserDocument = gql`
    query GetBrowser($id: ID64!) {
  result: browser(ID: $id) {
    clientMutationID
    data: browser {
      ...__browserData
    }
  }
}
    ${__BrowserDataFragmentDoc}`;

/**
 * __useGetBrowserQuery__
 *
 * To run a query within a React component, call `useGetBrowserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrowserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrowserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBrowserQuery(baseOptions: Apollo.QueryHookOptions<GetBrowserQuery, GetBrowserQueryVariables> & ({ variables: GetBrowserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrowserQuery, GetBrowserQueryVariables>(GetBrowserDocument, options);
      }
export function useGetBrowserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrowserQuery, GetBrowserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrowserQuery, GetBrowserQueryVariables>(GetBrowserDocument, options);
        }
export function useGetBrowserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrowserQuery, GetBrowserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrowserQuery, GetBrowserQueryVariables>(GetBrowserDocument, options);
        }
export type GetBrowserQueryHookResult = ReturnType<typeof useGetBrowserQuery>;
export type GetBrowserLazyQueryHookResult = ReturnType<typeof useGetBrowserLazyQuery>;
export type GetBrowserSuspenseQueryHookResult = ReturnType<typeof useGetBrowserSuspenseQuery>;
export type GetBrowserQueryResult = Apollo.QueryResult<GetBrowserQuery, GetBrowserQueryVariables>;
export const ListBrowsersDocument = gql`
    query ListBrowsers($page: Int! = 0, $size: Int! = 10, $filter: BrowserListFilter = null, $order: BrowserListOrder = null) {
  result: listBrowsers(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    totalCount
    list {
      ...__browserData
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__BrowserDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListBrowsersQuery__
 *
 * To run a query within a React component, call `useListBrowsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBrowsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBrowsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListBrowsersQuery(baseOptions?: Apollo.QueryHookOptions<ListBrowsersQuery, ListBrowsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBrowsersQuery, ListBrowsersQueryVariables>(ListBrowsersDocument, options);
      }
export function useListBrowsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBrowsersQuery, ListBrowsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBrowsersQuery, ListBrowsersQueryVariables>(ListBrowsersDocument, options);
        }
export function useListBrowsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListBrowsersQuery, ListBrowsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListBrowsersQuery, ListBrowsersQueryVariables>(ListBrowsersDocument, options);
        }
export type ListBrowsersQueryHookResult = ReturnType<typeof useListBrowsersQuery>;
export type ListBrowsersLazyQueryHookResult = ReturnType<typeof useListBrowsersLazyQuery>;
export type ListBrowsersSuspenseQueryHookResult = ReturnType<typeof useListBrowsersSuspenseQuery>;
export type ListBrowsersQueryResult = Apollo.QueryResult<ListBrowsersQuery, ListBrowsersQueryVariables>;
export const NewBrowserDocument = gql`
    mutation NewBrowser($input: BrowserInput!) {
  result: createBrowser(input: $input) {
    clientMutationID
    browserID
    browser {
      ...__browserData
    }
  }
}
    ${__BrowserDataFragmentDoc}`;
export type NewBrowserMutationFn = Apollo.MutationFunction<NewBrowserMutation, NewBrowserMutationVariables>;

/**
 * __useNewBrowserMutation__
 *
 * To run a mutation, you first call `useNewBrowserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewBrowserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newBrowserMutation, { data, loading, error }] = useNewBrowserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewBrowserMutation(baseOptions?: Apollo.MutationHookOptions<NewBrowserMutation, NewBrowserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewBrowserMutation, NewBrowserMutationVariables>(NewBrowserDocument, options);
      }
export type NewBrowserMutationHookResult = ReturnType<typeof useNewBrowserMutation>;
export type NewBrowserMutationResult = Apollo.MutationResult<NewBrowserMutation>;
export type NewBrowserMutationOptions = Apollo.BaseMutationOptions<NewBrowserMutation, NewBrowserMutationVariables>;
export const UpdateBrowserDocument = gql`
    mutation UpdateBrowser($id: ID64!, $input: BrowserInput!) {
  result: updateBrowser(ID: $id, input: $input) {
    clientMutationID
    browserID
    browser {
      ...__browserData
    }
  }
}
    ${__BrowserDataFragmentDoc}`;
export type UpdateBrowserMutationFn = Apollo.MutationFunction<UpdateBrowserMutation, UpdateBrowserMutationVariables>;

/**
 * __useUpdateBrowserMutation__
 *
 * To run a mutation, you first call `useUpdateBrowserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrowserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBrowserMutation, { data, loading, error }] = useUpdateBrowserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBrowserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBrowserMutation, UpdateBrowserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBrowserMutation, UpdateBrowserMutationVariables>(UpdateBrowserDocument, options);
      }
export type UpdateBrowserMutationHookResult = ReturnType<typeof useUpdateBrowserMutation>;
export type UpdateBrowserMutationResult = Apollo.MutationResult<UpdateBrowserMutation>;
export type UpdateBrowserMutationOptions = Apollo.BaseMutationOptions<UpdateBrowserMutation, UpdateBrowserMutationVariables>;
export const GetDeviceMakerDocument = gql`
    query GetDeviceMaker($id: ID64!) {
  result: deviceMaker(ID: $id) {
    data: maker {
      ...__deviceMaker
    }
  }
}
    ${__DeviceMakerFragmentDoc}`;

/**
 * __useGetDeviceMakerQuery__
 *
 * To run a query within a React component, call `useGetDeviceMakerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceMakerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceMakerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeviceMakerQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceMakerQuery, GetDeviceMakerQueryVariables> & ({ variables: GetDeviceMakerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceMakerQuery, GetDeviceMakerQueryVariables>(GetDeviceMakerDocument, options);
      }
export function useGetDeviceMakerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceMakerQuery, GetDeviceMakerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceMakerQuery, GetDeviceMakerQueryVariables>(GetDeviceMakerDocument, options);
        }
export function useGetDeviceMakerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceMakerQuery, GetDeviceMakerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeviceMakerQuery, GetDeviceMakerQueryVariables>(GetDeviceMakerDocument, options);
        }
export type GetDeviceMakerQueryHookResult = ReturnType<typeof useGetDeviceMakerQuery>;
export type GetDeviceMakerLazyQueryHookResult = ReturnType<typeof useGetDeviceMakerLazyQuery>;
export type GetDeviceMakerSuspenseQueryHookResult = ReturnType<typeof useGetDeviceMakerSuspenseQuery>;
export type GetDeviceMakerQueryResult = Apollo.QueryResult<GetDeviceMakerQuery, GetDeviceMakerQueryVariables>;
export const ListDeviceMakersDocument = gql`
    query ListDeviceMakers($page: Int! = 0, $size: Int! = 10, $filter: DeviceMakerListFilter = null, $order: DeviceMakerListOrder = null) {
  result: listDeviceMakers(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    list {
      ...__deviceMaker
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__DeviceMakerFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListDeviceMakersQuery__
 *
 * To run a query within a React component, call `useListDeviceMakersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDeviceMakersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDeviceMakersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListDeviceMakersQuery(baseOptions?: Apollo.QueryHookOptions<ListDeviceMakersQuery, ListDeviceMakersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDeviceMakersQuery, ListDeviceMakersQueryVariables>(ListDeviceMakersDocument, options);
      }
export function useListDeviceMakersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDeviceMakersQuery, ListDeviceMakersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDeviceMakersQuery, ListDeviceMakersQueryVariables>(ListDeviceMakersDocument, options);
        }
export function useListDeviceMakersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDeviceMakersQuery, ListDeviceMakersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDeviceMakersQuery, ListDeviceMakersQueryVariables>(ListDeviceMakersDocument, options);
        }
export type ListDeviceMakersQueryHookResult = ReturnType<typeof useListDeviceMakersQuery>;
export type ListDeviceMakersLazyQueryHookResult = ReturnType<typeof useListDeviceMakersLazyQuery>;
export type ListDeviceMakersSuspenseQueryHookResult = ReturnType<typeof useListDeviceMakersSuspenseQuery>;
export type ListDeviceMakersQueryResult = Apollo.QueryResult<ListDeviceMakersQuery, ListDeviceMakersQueryVariables>;
export const CreateDeviceMakerDocument = gql`
    mutation CreateDeviceMaker($input: DeviceMakerInput!) {
  result: createDeviceMaker(input: $input) {
    data: maker {
      ...__deviceMaker
    }
  }
}
    ${__DeviceMakerFragmentDoc}`;
export type CreateDeviceMakerMutationFn = Apollo.MutationFunction<CreateDeviceMakerMutation, CreateDeviceMakerMutationVariables>;

/**
 * __useCreateDeviceMakerMutation__
 *
 * To run a mutation, you first call `useCreateDeviceMakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceMakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceMakerMutation, { data, loading, error }] = useCreateDeviceMakerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeviceMakerMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeviceMakerMutation, CreateDeviceMakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeviceMakerMutation, CreateDeviceMakerMutationVariables>(CreateDeviceMakerDocument, options);
      }
export type CreateDeviceMakerMutationHookResult = ReturnType<typeof useCreateDeviceMakerMutation>;
export type CreateDeviceMakerMutationResult = Apollo.MutationResult<CreateDeviceMakerMutation>;
export type CreateDeviceMakerMutationOptions = Apollo.BaseMutationOptions<CreateDeviceMakerMutation, CreateDeviceMakerMutationVariables>;
export const UpdateDeviceMakerDocument = gql`
    mutation UpdateDeviceMaker($id: ID64!, $input: DeviceMakerInput!) {
  result: updateDeviceMaker(ID: $id, input: $input) {
    data: maker {
      ...__deviceMaker
    }
  }
}
    ${__DeviceMakerFragmentDoc}`;
export type UpdateDeviceMakerMutationFn = Apollo.MutationFunction<UpdateDeviceMakerMutation, UpdateDeviceMakerMutationVariables>;

/**
 * __useUpdateDeviceMakerMutation__
 *
 * To run a mutation, you first call `useUpdateDeviceMakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeviceMakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeviceMakerMutation, { data, loading, error }] = useUpdateDeviceMakerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDeviceMakerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeviceMakerMutation, UpdateDeviceMakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeviceMakerMutation, UpdateDeviceMakerMutationVariables>(UpdateDeviceMakerDocument, options);
      }
export type UpdateDeviceMakerMutationHookResult = ReturnType<typeof useUpdateDeviceMakerMutation>;
export type UpdateDeviceMakerMutationResult = Apollo.MutationResult<UpdateDeviceMakerMutation>;
export type UpdateDeviceMakerMutationOptions = Apollo.BaseMutationOptions<UpdateDeviceMakerMutation, UpdateDeviceMakerMutationVariables>;
export const ListDeviceTypesDocument = gql`
    query ListDeviceTypes {
  result: listDeviceTypes {
    ...__deviceType
  }
}
    ${__DeviceTypeFragmentDoc}`;

/**
 * __useListDeviceTypesQuery__
 *
 * To run a query within a React component, call `useListDeviceTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDeviceTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDeviceTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListDeviceTypesQuery(baseOptions?: Apollo.QueryHookOptions<ListDeviceTypesQuery, ListDeviceTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDeviceTypesQuery, ListDeviceTypesQueryVariables>(ListDeviceTypesDocument, options);
      }
export function useListDeviceTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDeviceTypesQuery, ListDeviceTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDeviceTypesQuery, ListDeviceTypesQueryVariables>(ListDeviceTypesDocument, options);
        }
export function useListDeviceTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDeviceTypesQuery, ListDeviceTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDeviceTypesQuery, ListDeviceTypesQueryVariables>(ListDeviceTypesDocument, options);
        }
export type ListDeviceTypesQueryHookResult = ReturnType<typeof useListDeviceTypesQuery>;
export type ListDeviceTypesLazyQueryHookResult = ReturnType<typeof useListDeviceTypesLazyQuery>;
export type ListDeviceTypesSuspenseQueryHookResult = ReturnType<typeof useListDeviceTypesSuspenseQuery>;
export type ListDeviceTypesQueryResult = Apollo.QueryResult<ListDeviceTypesQuery, ListDeviceTypesQueryVariables>;
export const GetDeviceModelDocument = gql`
    query GetDeviceModel($id: ID64!) {
  result: deviceModel(ID: $id) {
    data: model {
      ...__deviceModel
    }
  }
}
    ${__DeviceModelFragmentDoc}`;

/**
 * __useGetDeviceModelQuery__
 *
 * To run a query within a React component, call `useGetDeviceModelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceModelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceModelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDeviceModelQuery(baseOptions: Apollo.QueryHookOptions<GetDeviceModelQuery, GetDeviceModelQueryVariables> & ({ variables: GetDeviceModelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceModelQuery, GetDeviceModelQueryVariables>(GetDeviceModelDocument, options);
      }
export function useGetDeviceModelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceModelQuery, GetDeviceModelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceModelQuery, GetDeviceModelQueryVariables>(GetDeviceModelDocument, options);
        }
export function useGetDeviceModelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeviceModelQuery, GetDeviceModelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeviceModelQuery, GetDeviceModelQueryVariables>(GetDeviceModelDocument, options);
        }
export type GetDeviceModelQueryHookResult = ReturnType<typeof useGetDeviceModelQuery>;
export type GetDeviceModelLazyQueryHookResult = ReturnType<typeof useGetDeviceModelLazyQuery>;
export type GetDeviceModelSuspenseQueryHookResult = ReturnType<typeof useGetDeviceModelSuspenseQuery>;
export type GetDeviceModelQueryResult = Apollo.QueryResult<GetDeviceModelQuery, GetDeviceModelQueryVariables>;
export const ListDeviceModelsDocument = gql`
    query ListDeviceModels($page: Int! = 0, $size: Int! = 10, $filter: DeviceModelListFilter = null, $order: DeviceModelListOrder = null) {
  result: listDeviceModels(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    list {
      ...__deviceModel
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__DeviceModelFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListDeviceModelsQuery__
 *
 * To run a query within a React component, call `useListDeviceModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDeviceModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDeviceModelsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListDeviceModelsQuery(baseOptions?: Apollo.QueryHookOptions<ListDeviceModelsQuery, ListDeviceModelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDeviceModelsQuery, ListDeviceModelsQueryVariables>(ListDeviceModelsDocument, options);
      }
export function useListDeviceModelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDeviceModelsQuery, ListDeviceModelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDeviceModelsQuery, ListDeviceModelsQueryVariables>(ListDeviceModelsDocument, options);
        }
export function useListDeviceModelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListDeviceModelsQuery, ListDeviceModelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListDeviceModelsQuery, ListDeviceModelsQueryVariables>(ListDeviceModelsDocument, options);
        }
export type ListDeviceModelsQueryHookResult = ReturnType<typeof useListDeviceModelsQuery>;
export type ListDeviceModelsLazyQueryHookResult = ReturnType<typeof useListDeviceModelsLazyQuery>;
export type ListDeviceModelsSuspenseQueryHookResult = ReturnType<typeof useListDeviceModelsSuspenseQuery>;
export type ListDeviceModelsQueryResult = Apollo.QueryResult<ListDeviceModelsQuery, ListDeviceModelsQueryVariables>;
export const StatisticsDocument = gql`
    query Statistics($filter: StatisticAdListFilter = null, $group: [StatisticKey!]!, $order: [StatisticAdKeyOrder!] = null, $page: Page = null) {
  result: statisticAdList(
    filter: $filter
    order: $order
    group: $group
    page: $page
  ) {
    totalCount
    list {
      ...__statItem
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__StatItemFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useStatisticsQuery__
 *
 * To run a query within a React component, call `useStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatisticsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      group: // value for 'group'
 *      order: // value for 'order'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useStatisticsQuery(baseOptions: Apollo.QueryHookOptions<StatisticsQuery, StatisticsQueryVariables> & ({ variables: StatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatisticsQuery, StatisticsQueryVariables>(StatisticsDocument, options);
      }
export function useStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatisticsQuery, StatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatisticsQuery, StatisticsQueryVariables>(StatisticsDocument, options);
        }
export function useStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StatisticsQuery, StatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StatisticsQuery, StatisticsQueryVariables>(StatisticsDocument, options);
        }
export type StatisticsQueryHookResult = ReturnType<typeof useStatisticsQuery>;
export type StatisticsLazyQueryHookResult = ReturnType<typeof useStatisticsLazyQuery>;
export type StatisticsSuspenseQueryHookResult = ReturnType<typeof useStatisticsSuspenseQuery>;
export type StatisticsQueryResult = Apollo.QueryResult<StatisticsQuery, StatisticsQueryVariables>;
export const GetBillingBalanceDocument = gql`
    query GetBillingBalance($key: String!) {
  result: balance(key: $key) {
    ...__billingBalance
  }
}
    ${__BillingBalanceFragmentDoc}`;

/**
 * __useGetBillingBalanceQuery__
 *
 * To run a query within a React component, call `useGetBillingBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingBalanceQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetBillingBalanceQuery(baseOptions: Apollo.QueryHookOptions<GetBillingBalanceQuery, GetBillingBalanceQueryVariables> & ({ variables: GetBillingBalanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBillingBalanceQuery, GetBillingBalanceQueryVariables>(GetBillingBalanceDocument, options);
      }
export function useGetBillingBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBillingBalanceQuery, GetBillingBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBillingBalanceQuery, GetBillingBalanceQueryVariables>(GetBillingBalanceDocument, options);
        }
export function useGetBillingBalanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBillingBalanceQuery, GetBillingBalanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBillingBalanceQuery, GetBillingBalanceQueryVariables>(GetBillingBalanceDocument, options);
        }
export type GetBillingBalanceQueryHookResult = ReturnType<typeof useGetBillingBalanceQuery>;
export type GetBillingBalanceLazyQueryHookResult = ReturnType<typeof useGetBillingBalanceLazyQuery>;
export type GetBillingBalanceSuspenseQueryHookResult = ReturnType<typeof useGetBillingBalanceSuspenseQuery>;
export type GetBillingBalanceQueryResult = Apollo.QueryResult<GetBillingBalanceQuery, GetBillingBalanceQueryVariables>;
export const ListHistoryDocument = gql`
    query ListHistory($page: Int! = 0, $size: Int! = 10, $filter: HistoryActionListFilter = null, $order: HistoryActionListOrder = null) {
  result: listHistory(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    totalCount
    list {
      ID
      RequestID
      name
      message
      userID
      accountID
      objectType
      objectIDs
      data
      actionAt
    }
    pageInfo {
      ...__pageInfo
    }
  }
}
    ${__PageInfoFragmentDoc}`;

/**
 * __useListHistoryQuery__
 *
 * To run a query within a React component, call `useListHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useListHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListHistoryQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListHistoryQuery(baseOptions?: Apollo.QueryHookOptions<ListHistoryQuery, ListHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListHistoryQuery, ListHistoryQueryVariables>(ListHistoryDocument, options);
      }
export function useListHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListHistoryQuery, ListHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListHistoryQuery, ListHistoryQueryVariables>(ListHistoryDocument, options);
        }
export function useListHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListHistoryQuery, ListHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListHistoryQuery, ListHistoryQueryVariables>(ListHistoryDocument, options);
        }
export type ListHistoryQueryHookResult = ReturnType<typeof useListHistoryQuery>;
export type ListHistoryLazyQueryHookResult = ReturnType<typeof useListHistoryLazyQuery>;
export type ListHistorySuspenseQueryHookResult = ReturnType<typeof useListHistorySuspenseQuery>;
export type ListHistoryQueryResult = Apollo.QueryResult<ListHistoryQuery, ListHistoryQueryVariables>;
export const GetZoneDocument = gql`
    query GetZone($id: ID64!) {
  result: zone(ID: $id) {
    clientMutationID
    data: zone {
      ...__zoneData
    }
  }
}
    ${__ZoneDataFragmentDoc}`;

/**
 * __useGetZoneQuery__
 *
 * To run a query within a React component, call `useGetZoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetZoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetZoneQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetZoneQuery(baseOptions: Apollo.QueryHookOptions<GetZoneQuery, GetZoneQueryVariables> & ({ variables: GetZoneQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetZoneQuery, GetZoneQueryVariables>(GetZoneDocument, options);
      }
export function useGetZoneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetZoneQuery, GetZoneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetZoneQuery, GetZoneQueryVariables>(GetZoneDocument, options);
        }
export function useGetZoneSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetZoneQuery, GetZoneQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetZoneQuery, GetZoneQueryVariables>(GetZoneDocument, options);
        }
export type GetZoneQueryHookResult = ReturnType<typeof useGetZoneQuery>;
export type GetZoneLazyQueryHookResult = ReturnType<typeof useGetZoneLazyQuery>;
export type GetZoneSuspenseQueryHookResult = ReturnType<typeof useGetZoneSuspenseQuery>;
export type GetZoneQueryResult = Apollo.QueryResult<GetZoneQuery, GetZoneQueryVariables>;
export const ListZonesDocument = gql`
    query ListZones($page: Int! = 0, $size: Int! = 10, $filter: ZoneListFilter = null, $order: ZoneListOrder = null) {
  result: listZones(
    filter: $filter
    order: $order
    page: {startPage: $page, size: $size}
  ) {
    totalCount
    list {
      ...__zoneData
    }
    pageInfo {
      ...__pageInfo
    }
  }
  permApprove: checkPermission(name: "approve.*", key: "adv_zone")
  permReject: checkPermission(name: "reject.*", key: "adv_zone")
}
    ${__ZoneDataFragmentDoc}
${__PageInfoFragmentDoc}`;

/**
 * __useListZonesQuery__
 *
 * To run a query within a React component, call `useListZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListZonesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *      filter: // value for 'filter'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useListZonesQuery(baseOptions?: Apollo.QueryHookOptions<ListZonesQuery, ListZonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListZonesQuery, ListZonesQueryVariables>(ListZonesDocument, options);
      }
export function useListZonesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListZonesQuery, ListZonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListZonesQuery, ListZonesQueryVariables>(ListZonesDocument, options);
        }
export function useListZonesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListZonesQuery, ListZonesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListZonesQuery, ListZonesQueryVariables>(ListZonesDocument, options);
        }
export type ListZonesQueryHookResult = ReturnType<typeof useListZonesQuery>;
export type ListZonesLazyQueryHookResult = ReturnType<typeof useListZonesLazyQuery>;
export type ListZonesSuspenseQueryHookResult = ReturnType<typeof useListZonesSuspenseQuery>;
export type ListZonesQueryResult = Apollo.QueryResult<ListZonesQuery, ListZonesQueryVariables>;
export const CreateZoneDocument = gql`
    mutation CreateZone($input: ZoneInput!) {
  result: createZone(input: $input) {
    clientMutationID
    zoneID
    data: zone {
      ...__zoneData
    }
  }
}
    ${__ZoneDataFragmentDoc}`;
export type CreateZoneMutationFn = Apollo.MutationFunction<CreateZoneMutation, CreateZoneMutationVariables>;

/**
 * __useCreateZoneMutation__
 *
 * To run a mutation, you first call `useCreateZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createZoneMutation, { data, loading, error }] = useCreateZoneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateZoneMutation(baseOptions?: Apollo.MutationHookOptions<CreateZoneMutation, CreateZoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateZoneMutation, CreateZoneMutationVariables>(CreateZoneDocument, options);
      }
export type CreateZoneMutationHookResult = ReturnType<typeof useCreateZoneMutation>;
export type CreateZoneMutationResult = Apollo.MutationResult<CreateZoneMutation>;
export type CreateZoneMutationOptions = Apollo.BaseMutationOptions<CreateZoneMutation, CreateZoneMutationVariables>;
export const UpdateZoneDocument = gql`
    mutation UpdateZone($id: ID64!, $input: ZoneInput!) {
  result: updateZone(ID: $id, input: $input) {
    clientMutationID
    zoneID
    data: zone {
      ...__zoneData
    }
  }
}
    ${__ZoneDataFragmentDoc}`;
export type UpdateZoneMutationFn = Apollo.MutationFunction<UpdateZoneMutation, UpdateZoneMutationVariables>;

/**
 * __useUpdateZoneMutation__
 *
 * To run a mutation, you first call `useUpdateZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateZoneMutation, { data, loading, error }] = useUpdateZoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateZoneMutation(baseOptions?: Apollo.MutationHookOptions<UpdateZoneMutation, UpdateZoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateZoneMutation, UpdateZoneMutationVariables>(UpdateZoneDocument, options);
      }
export type UpdateZoneMutationHookResult = ReturnType<typeof useUpdateZoneMutation>;
export type UpdateZoneMutationResult = Apollo.MutationResult<UpdateZoneMutation>;
export type UpdateZoneMutationOptions = Apollo.BaseMutationOptions<UpdateZoneMutation, UpdateZoneMutationVariables>;
export const DeleteZoneDocument = gql`
    mutation DeleteZone($id: ID64!) {
  result: deleteZone(ID: $id) {
    clientMutationID
  }
}
    `;
export type DeleteZoneMutationFn = Apollo.MutationFunction<DeleteZoneMutation, DeleteZoneMutationVariables>;

/**
 * __useDeleteZoneMutation__
 *
 * To run a mutation, you first call `useDeleteZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteZoneMutation, { data, loading, error }] = useDeleteZoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteZoneMutation(baseOptions?: Apollo.MutationHookOptions<DeleteZoneMutation, DeleteZoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteZoneMutation, DeleteZoneMutationVariables>(DeleteZoneDocument, options);
      }
export type DeleteZoneMutationHookResult = ReturnType<typeof useDeleteZoneMutation>;
export type DeleteZoneMutationResult = Apollo.MutationResult<DeleteZoneMutation>;
export type DeleteZoneMutationOptions = Apollo.BaseMutationOptions<DeleteZoneMutation, DeleteZoneMutationVariables>;
export const ApproveZoneDocument = gql`
    mutation ApproveZone($id: ID64!, $msg: String = null) {
  result: approveZone(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type ApproveZoneMutationFn = Apollo.MutationFunction<ApproveZoneMutation, ApproveZoneMutationVariables>;

/**
 * __useApproveZoneMutation__
 *
 * To run a mutation, you first call `useApproveZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveZoneMutation, { data, loading, error }] = useApproveZoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useApproveZoneMutation(baseOptions?: Apollo.MutationHookOptions<ApproveZoneMutation, ApproveZoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveZoneMutation, ApproveZoneMutationVariables>(ApproveZoneDocument, options);
      }
export type ApproveZoneMutationHookResult = ReturnType<typeof useApproveZoneMutation>;
export type ApproveZoneMutationResult = Apollo.MutationResult<ApproveZoneMutation>;
export type ApproveZoneMutationOptions = Apollo.BaseMutationOptions<ApproveZoneMutation, ApproveZoneMutationVariables>;
export const RejectZoneDocument = gql`
    mutation RejectZone($id: ID64!, $msg: String = null) {
  result: rejectZone(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type RejectZoneMutationFn = Apollo.MutationFunction<RejectZoneMutation, RejectZoneMutationVariables>;

/**
 * __useRejectZoneMutation__
 *
 * To run a mutation, you first call `useRejectZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectZoneMutation, { data, loading, error }] = useRejectZoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useRejectZoneMutation(baseOptions?: Apollo.MutationHookOptions<RejectZoneMutation, RejectZoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectZoneMutation, RejectZoneMutationVariables>(RejectZoneDocument, options);
      }
export type RejectZoneMutationHookResult = ReturnType<typeof useRejectZoneMutation>;
export type RejectZoneMutationResult = Apollo.MutationResult<RejectZoneMutation>;
export type RejectZoneMutationOptions = Apollo.BaseMutationOptions<RejectZoneMutation, RejectZoneMutationVariables>;
export const ActivateZoneDocument = gql`
    mutation ActivateZone($id: ID64!, $msg: String = null) {
  result: activateZone(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type ActivateZoneMutationFn = Apollo.MutationFunction<ActivateZoneMutation, ActivateZoneMutationVariables>;

/**
 * __useActivateZoneMutation__
 *
 * To run a mutation, you first call `useActivateZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateZoneMutation, { data, loading, error }] = useActivateZoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useActivateZoneMutation(baseOptions?: Apollo.MutationHookOptions<ActivateZoneMutation, ActivateZoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateZoneMutation, ActivateZoneMutationVariables>(ActivateZoneDocument, options);
      }
export type ActivateZoneMutationHookResult = ReturnType<typeof useActivateZoneMutation>;
export type ActivateZoneMutationResult = Apollo.MutationResult<ActivateZoneMutation>;
export type ActivateZoneMutationOptions = Apollo.BaseMutationOptions<ActivateZoneMutation, ActivateZoneMutationVariables>;
export const DeactivateZoneDocument = gql`
    mutation DeactivateZone($id: ID64!, $msg: String = null) {
  result: deactivateZone(ID: $id, msg: $msg) {
    clientMutationID
    status
    message
  }
}
    `;
export type DeactivateZoneMutationFn = Apollo.MutationFunction<DeactivateZoneMutation, DeactivateZoneMutationVariables>;

/**
 * __useDeactivateZoneMutation__
 *
 * To run a mutation, you first call `useDeactivateZoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateZoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateZoneMutation, { data, loading, error }] = useDeactivateZoneMutation({
 *   variables: {
 *      id: // value for 'id'
 *      msg: // value for 'msg'
 *   },
 * });
 */
export function useDeactivateZoneMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateZoneMutation, DeactivateZoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateZoneMutation, DeactivateZoneMutationVariables>(DeactivateZoneDocument, options);
      }
export type DeactivateZoneMutationHookResult = ReturnType<typeof useDeactivateZoneMutation>;
export type DeactivateZoneMutationResult = Apollo.MutationResult<DeactivateZoneMutation>;
export type DeactivateZoneMutationOptions = Apollo.BaseMutationOptions<DeactivateZoneMutation, DeactivateZoneMutationVariables>;