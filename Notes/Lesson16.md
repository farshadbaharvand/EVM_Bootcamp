# Using Oracles on EVM Blockchains

## Introduction

Smart contracts deployed on EVM-compatible blockchains are inherently deterministic and isolated. This means they cannot natively access or interact with external (off-chain) data, systems, or APIs. Oracles solve this limitation by acting as secure bridges between off-chain and on-chain environments.

## Purpose

The main purpose of oracles is to enable smart contracts to consume external data or trigger external processes while preserving decentralization, trustlessness, and security.

Oracles can:

- Provide real-world data (e.g., price feeds, weather data, sports results)
- Trigger external events or API calls
- Bring off-chain computation results on-chain
- Securely relay cross-chain messages

## Oracle Types

### 1. Software Oracles

- Interact with online data sources such as APIs, websites, and databases.
- Common use case: bringing asset prices or weather data to smart contracts.

### 2. Hardware Oracles

- Connect physical devices (IoT sensors, barcode scanners) to smart contracts.
- Common in supply chain applications.

### 3. Inbound Oracles

- Deliver data from the external world into the blockchain.

### 4. Outbound Oracles

- Enable smart contracts to send commands or information to external systems.

### 5. Cross-Chain Oracles

- Relay data between different blockchains.

### 6. Human Oracles

- Subject matter experts manually input data on-chain.


---


# Oracle Architectural Models

This section deconstructs the fundamental models by which oracles deliver data on-chain, focusing on the technical and economic trade-offs that influence a developer's choice.

## The Imperative for Decentralisation

Blockchains are designed to be self-contained, deterministic systems. This isolation is a feature, not a bug, as it ensures that every node in the network can reach a consensus by processing the same transactions with the same data.

However, this also means smart contracts cannot natively access external data. Introducing an external data source via a centralised oracle—a single entity providing data—reintroduces a single point of failure.

This approach fundamentally undermines the value proposition of a decentralised application, as the security and reliability of the entire system become contingent on that one centralised component.

To solve this, the industry standard is the use of **Decentralised Oracle Networks (DONs)**.

A DON consists of multiple independent, geographically distributed, and Sybil-resistant node operators.

These nodes each fetch data from various external sources, come to a consensus on the correct value (typically via a median), and then report that aggregated value to the blockchain.

This decentralised architecture ensures high availability and robust resistance to tampering, as an attacker would need to compromise a significant number of independent nodes to manipulate the data feed.

## Data Delivery Models: Push vs. Pull

While decentralisation at the node level is a common foundation, the primary architectural distinction among oracle services lies in the mechanism by which data is delivered to the blockchain.

This gives rise to two dominant models: the proactive **Push** model and the reactive **Pull** model.

The choice between these models has significant implications for data freshness, latency, gas costs, and overall application design.

---

## The Push Model

### Mechanism

In the push model, the decentralised oracle network proactively and automatically updates a data value stored on the blockchain. These updates are not continuous but are triggered by predefined conditions set by the oracle network. The two standard triggers are:

- **Deviation Threshold**: An update is pushed to the chain if the off-chain value of the asset deviates by a certain percentage (e.g., 0.5% or 1%) from the value currently stored on-chain.
- **Heartbeat**: An update is pushed to the chain if a certain amount of time has elapsed since the last on-chain update (e.g., every hour), regardless of price deviation. This ensures that the on-chain data does not become excessively stale.

### On-Chain State

This process maintains an on-chain smart contract, often referred to as a **reference contract** or **aggregator**, which stores the latest data value.

Smart contracts that consume this data can simply perform a synchronous view call to this aggregator contract to read the current price. This is a simple and gas-efficient read operation for the consuming contract.

### Primary Use Case

The push model is optimised for reliability and consistent on-chain data availability. It is highly suitable for applications where having a trustworthy, readily accessible price on-chain at all times is critical for core protocol functions.

The canonical example is **DeFi lending and borrowing protocols** like Aave and Compound. These platforms rely on push-based price feeds to continuously value user collateral and trigger liquidations when loan-to-value ratios are breached.

The seamless developer experience and the guarantee of on-chain data availability have made **Chainlink Data Feeds**, which primarily use the push model, the industry standard for this category of applications.

### Limitations

The primary drawback of the push model is its **cost structure**. The oracle network itself bears the gas costs for every on-chain update.

These costs are incurred for every heartbeat and deviation trigger, across every feed, on every supported blockchain, regardless of whether any application is actively using the data at that moment.

This continuous operational overhead makes it economically unfeasible to support a vast array of data feeds or to deploy on a large number of less-trafficked blockchains.

Consequently, push-based oracles tend to offer a more limited selection of feeds, focusing on **high-demand assets** where the value secured justifies the ongoing gas expenditure.

---

## The Pull Model

### Mechanism

In the pull model, data is only brought on-chain when it is explicitly requested, or **pulled**, by an end-user or an application.

The oracle network operates differently: it generates a continuous stream of **cryptographically signed price reports off-chain** at a very high frequency (e.g., Pyth Network updates every 400 milliseconds).

These signed messages are made available via an **off-chain API** or service.

### On-Chain State

To use the data, an application or user must first **fetch the required signed price update** from the off-chain service.

This signed message is then included as part of a transaction sent to the blockchain.

The transaction calls a function on the dApp, which in turn passes the signed update to the oracle's on-chain contract.

The oracle contract **verifies the signatures** on the message and, if valid, updates its on-chain price state.

The dApp's logic can then proceed to read this freshly updated price, all within the same **atomic transaction**.

### Primary Use Case

The pull model is optimised for **low-latency and high-frequency data** requirements. It is ideal for applications where having the **absolute freshest data** at the precise moment of a transaction is paramount.

This includes latency-sensitive use cases such as **on-chain perpetual futures markets, options protocols**, and other derivatives platforms that need to minimise the risk of executing trades against stale prices.

**Pyth Network** is a leading oracle provider that has spearheaded the adoption of this model.

### Advantages

This on-demand architecture is significantly more **scalable and gas-efficient** from the perspective of the oracle network. Because the gas cost of the on-chain update is **borne by the end-user** at the time of use, the network can support a vast catalogue of thousands of price feeds across a multitude of blockchains.

The network does not incur costs for feeds that are not actively being pulled on-chain. This model also provides access to **much lower-latency data**, as the off-chain reports are generated far more frequently than would be economically viable in a push model.

### Developer Consideration

The primary consideration for developers is that the **responsibility and the gas cost** for updating the on-chain price shift from the oracle network to the application's **user**. The dApp's architecture, both on-chain and off-chain, must be designed to accommodate this workflow: the frontend or backend must fetch the signed update, and the smart contract logic must be structured to first submit this update to the oracle contract before consuming the price.

---

## Economic Considerations

The choice between these models is not merely technical but is fundamentally driven by **economics**.

The **allocation of gas costs**—whether borne by the network (**Push**) or the end-user (**Pull**)—directly dictates the service's characteristics.

In the push model, the network internalises the cost, leading it to offer a **curated set of highly reliable feeds** for which broad, continuous demand justifies the operational expense. This model was perfectly suited for the **first wave of DeFi**, which was dominated by lending protocols.

In the pull model, the cost is externalised to the user who derives **immediate value** from the update. This allows the network to offer a massive, **long-tail catalogue** of feeds with minimal overhead, as it does not pay to maintain the on-chain state of unused assets.

This economic structure enables a **new generation of latency-sensitive DeFi applications**, like derivatives markets, that require a wider variety of assets and more frequent updates than the push model can economically provide.

Therefore, the evolution from a push-dominated market to one with strong pull-based competitors reflects the **maturation and specialisation** of the DeFi ecosystem itself. The selection of an oracle model is thus an **economic decision** about where to allocate gas costs in the application architecture to achieve the desired performance characteristics.

---

## Table 1: Comparative Analysis of Major Oracle Providers

| Provider       | Primary Model(s)                   | Data Sourcing Mechanism                                                                 | Key Feature                                                                                       | Typical EVM Use Case                                   |
|----------------|------------------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| **Chainlink**   | Push (Data Feeds), Pull (Data Streams) | Decentralised network of independent, third-party node operators aggregating data from multiple sources. | Market-leading reliability and security track record; extensive ecosystem adoption.               | DeFi Lending & Borrowing (e.g., Aave), Asset Management |
| **Pyth Network**| Pull                              | Network of first-party data publishers (exchanges, trading firms, market makers).        | High-frequency off-chain updates (sub-second) providing low-latency data on-demand.              | Perpetuals, Options, and other latency-sensitive derivatives protocols |
| **Band Protocol**| Push (via BandChain)              | Decentralised network of validators on its own Cosmos-SDK based blockchain (BandChain). | Cross-chain compatibility and flexibility for developers to create custom-made oracle scripts.    | Multi-chain dApps requiring flexible or bespoke data feeds |
| **API3**        | First-Party (via Airnode)         | Data providers run their own oracle nodes ('Airnodes'), creating a direct API-to-blockchain connection. | Eliminates third-party oracle node intermediaries, aiming for greater data source transparency and cost-efficiency. | Direct integration with any Web2 API for a wide variety of data types beyond price feeds |


---


# Implementing Push Model Price Feeds with Chainlink

## Introduction to Chainlink Data Feeds

Chainlink Data Feeds provide asset prices that are aggregated from a large, decentralised network of security-reviewed and Sybil-resistant node operators. These feeds are secured by crypto-economic incentives, ensuring that nodes are rewarded for providing accurate data and penalised for malicious behaviour. The primary smart contract component for a developer to interact with is a proxy contract that exposes the `AggregatorV3Interface`.

This interface provides a stable address and a consistent set of functions for retrieving data, even as the underlying aggregator contracts may be upgraded by the Chainlink team.

## Consuming Latest Price Data

The most common use case is retrieving the latest price of an asset. This is accomplished by making a view call to the `latestRoundData()` function on the data feed's proxy contract address.



## Interface Breakdown

### `latestRoundData()` Function Signature

```solidity
function latestRoundData()
    external
    view
    returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
```

### Returned Values

The `latestRoundData()` function returns five values:

1. **roundId**:  
   - Type: `uint80`  
   - Description: A unique, sequential ID for the aggregation round that produced this answer.

2. **answer**:  
   - Type: `int256`  
   - Description: The aggregated price value.  
   - Important: This is a **scaled integer**. To interpret the actual value, you must check the number of decimals used in the feed. This can be done by calling the `decimals()` function on the same aggregator contract.

3. **startedAt**:  
   - Type: `uint256`  
   - Description: The UNIX timestamp for when the round started.  
   - Usually used for debugging or extended tracking.

4. **updatedAt**:  
   - Type: `uint256`  
   - Description: The UNIX timestamp of when this answer was last updated on-chain.  
   - This is **critical** for verifying the freshness of the data.

5. **answeredInRound**:  
   - Type: `uint80`  
   - Description: The round ID in which the answer was computed.  
   - Used to confirm that the answer is from a fully completed round.

### Notes

- Most use cases only require `answer`, `updatedAt`, and `roundId`.
- Always verify that `updatedAt != 0` to ensure the round has been completed and contains valid data.
- For price feeds, make sure to convert `answer` properly by factoring in the number of decimals.

---

## Code Example: PriceConsumerV3
The following contract demonstrates a minimal implementation for reading the latest ETH/USD price from the Sepolia testnet.


```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title PriceConsumerV3
 * @notice A simple contract to consume the latest price from a Chainlink Data Feed.
 */
contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * @notice Constructor initializes the data feed interface.
     * @dev Network: Sepolia
     * @dev Aggregator: ETH/USD
     * @dev Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }

    /**
     * @notice Returns the latest price from the data feed.
     * @return The latest price as an integer. Note that this value has decimals.
     */
    function getLatestPrice() public view returns (int256) {
        // prettier-ignore
        (
            /* uint80 roundId */,
            int256 answer,
            /* uint256 startedAt */,
            /* uint256 updatedAt */,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();
        
        // The ETH/USD feed on Sepolia returns 8 decimals.
        // To get the price in USD, the answer should be divided by 10**8.
        return answer;
    }
}
```

---

## Retrieving Historical Price Data

Chainlink's architecture allows for the retrieval of historical price data from its decentralized oracle network. Each price update is associated with a unique `roundId`, making it possible to query the data from any previous round that is still stored on-chain.

This is accomplished using the `getRoundData(uint80 _roundId)` function provided by the `AggregatorV3Interface`.


## Code Example: Historical Price Consumer
This example extends the previous contract to include a function for fetching a price from a specific round.


```solidity
//... imports and contract definition as above...

contract HistoricalPriceConsumer {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306 // Sepolia ETH/USD
        );
    }

    /**
     * @notice Returns historical price data for a given round.
     * @param _roundId The ID of the round to retrieve data for.
     * @return The price from the specified round.
     */
    function getHistoricalPrice(uint80 _roundId) public view returns (int256) {
        // prettier-ignore
        (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.getRoundData(_roundId);

        // It is important to check that the round has been completed.
        // A non-zero timestamp indicates the round is complete.
        require(updatedAt > 0, "Round not complete");
        
        return answer;
    }
}
```


## Using the Feed Registry

Hardcoding data feed addresses into a smart contract introduces rigidity. If a feed address changes due to events such as a network upgrade, the consuming contract must be redeployed. The Chainlink **Feed Registry** addresses this limitation by introducing an additional layer of indirection.

### What Is the Feed Registry?

The Feed Registry is an on-chain smart contract that acts as a directory, mapping asset pairs (e.g., LINK/USD) to their corresponding, up-to-date data feed aggregator addresses.

The registry exposes functions like `latestAnswer` that mirror the aggregator interface but accept asset addresses as parameters instead of being called on a specific feed address.

## Code Example: Feed Registry Consumer

This guide demonstrates how to query the LINK/USD price using the Feed Registry on the Ethereum mainnet. It utilizes the Chainlink Denominations contract to obtain the standard address for fiat currencies like USD.

## Smart Contract Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";

/**
 * @title FeedRegistryConsumer
 * @notice Demonstrates how to query a price feed using the Feed Registry.
 */
contract FeedRegistryConsumer {
    FeedRegistryInterface internal registry;

    // Mainnet Feed Registry address
    address constant FEED_REGISTRY_ADDRESS = 0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf;
    
    // Mainnet LINK token address
    address constant LINK_TOKEN = 0x514910771AF9Ca656af840dff83E8264EcF986CA;
    
    // The Denominations contract provides a canonical address for non-token assets like USD.
    // Mainnet USD address from Denominations contract
    address constant USD = 0x0000000000000000000000000000000000000348;

    constructor() {
        registry = FeedRegistryInterface(FEED_REGISTRY_ADDRESS);
    }

    /**
     * @notice Gets the latest LINK/USD price via the registry.
     * @return The latest price of LINK in USD.
     */
    function getLinkUsdPrice() public view returns (int256) {
        // prettier-ignore
        (
            /* uint80 roundId */,
            int256 answer,
            /* uint256 startedAt */,
            /* uint256 updatedAt */,
            /* uint80 answeredInRound */
        ) = registry.latestRoundData(LINK_TOKEN, USD);
        
        return answer;
    }
}
```

## Data Freshness Considerations

When using a push-based oracle model like Chainlink, developers implicitly agree to uphold data integrity.

### Misleading Simplicity

Calling `latestRoundData()` is straightforward, but behind this simplicity lies a crucial responsibility: **validating the returned data**.

### Validate Freshness

The `answer` is only valid if it is **fresh**. The consuming contract must compare `updatedAt` with `block.timestamp` to ensure the data is not stale.

Stale data could arise due to:

- Network congestion
- Partial oracle network failure
- Downtime of the L2 sequencer (on Layer 2 networks)

### Required On-Chain Validation

Contracts must:

1. Retrieve the `updatedAt` timestamp from the oracle response.
2. Compare it to the current block timestamp.
3. Reject data if it is older than an acceptable threshold.

### L2-Specific Requirements

On Layer 2 chains, an additional check must be made using the **L2 Sequencer Uptime Feed** to:

- Confirm the sequencer is live.
- Prevent using stale prices during sequencer downtime.

### Security Implication

Failing to perform these validations introduces a critical vulnerability. It effectively transfers your application’s security to the oracle network's liveness without any fallback protection.

Always build with the assumption that external systems may fail — and validate accordingly.

---


# Implementing Pull Model Price Feeds with Pyth Network

This guide details the on-demand update model used for latency-sensitive applications, demonstrated using the Pyth Network — a first-party oracle that exemplifies the pull architecture.

## Introduction to the Pull Model Workflow

The pull model separates the off-chain generation of signed price updates from their on-chain consumption. It involves two environments:

### Off-Chain

- A dApp’s frontend or backend fetches a cryptographically signed `priceUpdateData` payload from an oracle’s public endpoint (e.g., Pyth’s Hermes Price Service).
- This payload contains recent price information for one or more assets.

### On-Chain

- The `priceUpdateData` is passed as a calldata argument into a smart contract function.
- The smart contract uses this data to update the oracle’s on-chain state and read the price within a single transaction.

## Integrating Pyth Price Feeds

To use Pyth, install the Pyth Solidity SDK:

```bash
npm install @pythnetwork/pyth-sdk-solidity
```

### Core Components

- `IPyth.sol`: Interface used to interact with the deployed Pyth contract on a given EVM chain. Includes functions for updating and reading prices.
- `PythStructs.sol`: Defines the data structures used by Pyth, especially the `Price` struct which includes:
  - `price`
  - `confidence`
  - `exponent`
  - `publishTime`

## The Three-Step On-Chain Process

Every smart contract function that consumes a Pyth price must follow these steps:

### 1. Get Fee

Call the following to get the fee required to update the price:

```solidity
uint256 fee = pyth.getUpdateFee(priceUpdateData);
```

This fee pays third-party relayers who submit Wormhole messages to bridge prices.

### 2. Update Prices

Use the `updatePriceFeeds` function to pass in the fee and the update data:

```solidity
pyth.updatePriceFeeds{value: fee}(priceUpdateData);
```

- This function verifies the signatures via Wormhole.
- If valid, it updates the on-chain price data.

### 3. Read Price

After updating, read the price using one of the following:

```solidity
PythStructs.Price memory price = pyth.getPrice(priceId);
```

Or, for stricter recency guarantees:

```solidity
PythStructs.Price memory price = pyth.getPriceNoOlderThan(priceId, maxAge);
```

- `priceId`: The unique identifier for the asset.
- `maxAge`: Maximum age in seconds that the price data is considered valid.

## Summary

By integrating Pyth's pull model, developers can:

- Fetch price data on-demand.
- Verify and update price feeds on-chain.
- Ensure latency-sensitive applications operate securely with up-to-date data.



---



# Pyth Consumer Contract Guide

## Overview

This guide demonstrates how to consume off-chain BTC/USD price data using the Pyth Network in Solidity. The example contract `PythConsumer` shows how to:

- Fetch price update fees
- Submit signed price update data
- Read the latest price feed on-chain
- Use price and confidence values in smart contract logic

## Pyth Consumer Solidity Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract PythConsumer {
    IPyth internal pyth;
    bytes32 constant BTC_USD_PRICE_ID = 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43;

    /**
     * @param _pythContractAddress The address of the Pyth contract for the specific chain.
     */
    constructor(address _pythContractAddress) {
        pyth = IPyth(_pythContractAddress);
    }

    /**
     * @notice An example function that requires a fresh BTC price to execute.
     * @param _priceUpdateData The signed price update data fetched from an off-chain service.
     */
    function executeWithBtcPrice(bytes calldata _priceUpdateData) public payable {
        // 1. Get the fee required to update the price feeds.
        uint256 fee = pyth.getUpdateFee(_priceUpdateData);

        // 2. Update the Pyth contract with the new price data, paying the required fee.
        // The msg.value of this transaction must be >= fee.
        pyth.updatePriceFeeds{value: fee}(_priceUpdateData);

        // 3. Read the freshly updated price.
        // We use getPriceNoOlderThan to ensure the price is not stale.
        // For a trading application, a small maxAge like 60 seconds is appropriate.
        PythStructs.Price memory currentPrice = pyth.getPriceNoOlderThan(BTC_USD_PRICE_ID, 60);

        // The price is returned as `price` with an `expo` (exponent).
        // The actual price is price * 10**expo.
        // For BTC/USD, expo is -8.
        int256 priceValue = currentPrice.price;
        int256 confidence = currentPrice.conf;

        // Now, the contract can use priceValue and confidence in its logic.
        // For example: require(someCondition(priceValue), "Condition failed");
    }
}
```

## Architectural Discussion: Pull Model vs. Push Model

- The **pull model** represents a major architectural shift in how oracles are integrated.
- Unlike the **push model**, where oracles update the blockchain on their own schedule, the pull model requires the **dApp to trigger on-chain updates**.
- This complexity is **intentional** and brings several benefits:

### Benefits of Pull Model

1. **Outsourced Costly Operations**:
   - Oracle networks only sign data off-chain.
   - Final delivery to the blockchain is managed by the consumer contract.

2. **Improved Performance**:
   - Developers control when and what to update, ensuring **data freshness**.
   - Enables **high-frequency** applications like trading, options, and lending.

3. **Access to More Data**:
   - Broader asset coverage is possible since updates are demand-driven.
   - dApps can cherry-pick relevant data.

4. **Mature and Specialized Use**:
   - Reflects growing maturity in oracle architecture.
   - Suitable for DeFi apps needing **granular control** and **real-time precision**.

### Trade-Offs

- **More complex integration** (handling update fees, off-chain data fetching).
- **Manual update triggers** require well-designed app logic.

## Summary

- The `PythConsumer` contract showcases how to securely access real-time BTC/USD pricing data using the **Pyth pull model**.
- Developers benefit from fine-grained control, performance gains, and greater data flexibility.
- The pull model marks a **specialized evolution** in oracle design, enabling next-generation dApps.



---


# Integrating Alternative Oracle Solutions

Beyond the canonical push and pull models exemplified by Chainlink and Pyth, other oracle providers offer distinct architectural philosophies.

This section explores two such alternatives, **Band Protocol** and **API3**, which present different approaches to cross-chain data and trust minimisation.

---

## Band Protocol: Cross-Chain and Customisable

### Architecture

Band Protocol is a cross-chain data oracle that operates on its own dedicated blockchain, **BandChain**, which is built using the **Cosmos SDK**.

This design is intended to offload the computationally intensive tasks of data sourcing and aggregation from the target EVM chain, thereby:

- Enhancing scalability
- Reducing the potential for network congestion

Its architecture is explicitly designed to be **blockchain-agnostic**, providing a versatile solution for multi-chain ecosystems.

---

### Mechanism

On EVM chains, developers interact with Band Protocol's data feeds through a `StdReferenceProxy` contract, which exposes an `IStdReference` interface.

A key difference from Chainlink's registry is that Band identifies assets using **string-based symbols** (e.g., `"BTC"`, `"ETH"`, `"USD"`) rather than token addresses.

This interface supports:

- **Single price queries** for asset pairs
- **Bulk queries** for greater gas efficiency in a single transaction

### Code Example: Band Protocol Consumer
The following contract demonstrates how to query single and multiple prices from Band Protocol.



```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// A simplified interface for Band Protocol's Standard Reference contract.
interface IStdReference {
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18
        uint256 lastUpdatedBase; // UNIX timestamp of the last base price update
        uint256 lastUpdatedQuote; // UNIX timestamp of the last quote price update
    }

    function getReferenceData(string calldata _base, string calldata _quote)
        external
        view
        returns (ReferenceData memory);

    function getReferenceDataBulk(string calldata _bases, string calldata _quotes)
        external
        view
        returns (ReferenceData memory);
}

contract BandConsumer {
    IStdReference internal ref;

    /**
     * @param _refAddress The address of the Band Protocol StdReferenceProxy contract.
     */
    constructor(address _refAddress) {
        ref = IStdReference(_refAddress);
    }

    /**
     * @notice Gets the latest price for a single pair (e.g., BTC/USD).
     * @return The exchange rate, scaled by 1e18.
     */
    function getSinglePrice() public view returns (uint256) {
        IStdReference.ReferenceData memory data = ref.getReferenceData("BTC", "USD");
        return data.rate;
    }

    /**
     * @notice Gets the latest prices for multiple pairs in one call.
     * @return An array of exchange rates for BTC/USD and ETH/USD.
     */
    function getBulkPrices() public view returns (uint256 memory) {
        string memory bases = new string(2);
        bases = "BTC";
        bases = "ETH";

        string memory quotes = new string(2);
        quotes = "USD";
        quotes = "USD";

        IStdReference.ReferenceData memory rates = ref.getReferenceDataBulk(bases, quotes);
        
        uint256 memory prices = new uint256(2);
        prices = rates.rate;
        prices = rates.rate;

        return prices;
    }
}



```

---


# API3: First-Party Oracles and Airnode

## Architecture

API3 represents a fundamental rethinking of the oracle model. Instead of relying on a network of third-party intermediaries to relay data, API3 enables the **data providers themselves** to operate their own oracle nodes, known as **'Airnodes'**.

This creates a **'first-party' oracle architecture**, establishing a direct, cryptographically signed bridge between the API data source and the on-chain smart contract.

---

## Rationale

This approach is designed to solve what API3 terms the **"API Connectivity Problem"** rather than the **"Oracle Problem"**. By eliminating the layer of third-party nodes, the model aims to:

- Increase data source transparency
- Remove the risk of middleman data tampering
- Reduce costs by cutting out fees paid to intermediaries

The Airnode itself is a lightweight, serverless **"set-and-forget"** wrapper, designed to be easily deployable by traditional Web2 API providers without requiring specialized blockchain knowledge or cryptocurrency handling.

---

## Mechanism

For dApp developers, the most common way to consume this data is through **dAPIs (decentralized APIs)**, which are on-chain data feeds aggregated from multiple first-party Airnodes.

Interaction typically occurs through a proxy contract that exposes a simple **IProxy** interface, from which the latest value can be read.

---

## Code Example: API3 dAPI Consumer

This example shows how to read a value from an API3 dAPI proxy and how an adapter can be used for compatibility with systems expecting a Chainlink-style interface.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Interface for an API3 dAPI proxy
interface IProxy {
    function read() external view returns (int256 value);
    function readWithTimestamp() external view returns (int256 value, uint32 timestamp);
}

// Interface for Chainlink Aggregator for adapter compatibility
interface AggregatorV3Interface {
    function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80);
    function decimals() external view returns (uint8);
}

// Simple consumer for a dAPI
contract Api3Consumer {
    IProxy internal dapiProxy;

    constructor(address _proxyAddress) {
        dapiProxy = IProxy(_proxyAddress);
    }

    function getLatestDapiValue() public view returns (int256, uint32) {
        return dapiProxy.readWithTimestamp();
    }
}

// Adapter to make an API3 dAPI compatible with a Chainlink-style interface
contract Api3Adapter is AggregatorV3Interface {
    IProxy public immutable api3Proxy;
    uint8 public immutable dapiDecimals;

    constructor(address _proxyAddress, uint8 _decimals) {
        api3Proxy = IProxy(_proxyAddress);
        dapiDecimals = _decimals;
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        (answer, uint32 timestamp) = api3Proxy.readWithTimestamp();
        // Adapter provides dummy values for unused fields
        updatedAt = timestamp;
        // Other fields like roundId are not applicable in this model
        return (0, answer, 0, updatedAt, 0);
    }

    function decimals() external view override returns (uint8) {
        return dapiDecimals;
    }
}


```

## Trust Models and Decentralization Spectrum
The variety in these oracle architectures reveals that **decentralisation** is not a monolithic concept but rather a spectrum of trust models.

Traditional DONs like Chainlink and Band Protocol decentralize the reporting of data; trust is placed in the crypto-economic incentives and consensus of a network of third-party operators.

In contrast, first-party oracles decentralize the sourcing of data.

Pyth's model places trust in the collective reputation and skin-in-the-game of a consortium of major financial institutions acting as data publishers.

API3 takes this further, advocating for trust in the individual data source provider, who signs their own data directly.

When a developer chooses an oracle, they are therefore making a critical, second-order decision about their application's security posture:

Do they trust a network of anonymous-but-staked reporters?

A club of reputable institutions?

Or the data source itself?

This choice of trust model is as fundamental as the choice of the technology itself.


---


# Security Best Practices for Oracle Integration

Integrating an oracle introduces an external dependency, which expands a smart contract's attack surface. An insecure oracle integration is a frequent and often catastrophic vulnerability vector in DeFi.

Adherence to rigorous security practices is therefore not optional but essential for building a robust application.

---

## Input Data Validation

A contract must never blindly trust the data returned by an oracle. All incoming data must be subjected to a series of on-chain validation checks before it is used in any critical logic.

### Staleness Checks

The most critical validation is checking for data freshness. An oracle network could suffer an outage or be impacted by severe blockchain congestion, preventing it from posting updates. Using a stale price can lead to incorrect valuations and open the protocol to exploitation.

**Implementation:** Always check the timestamp returned by the oracle (`updatedAt`, `lastUpdatedBase`, etc.) against the current block's timestamp (`block.timestamp`). If the difference exceeds a reasonable, application-specific threshold (e.g., more than one hour for a lending protocol), the transaction must be reverted.

```solidity
require(block.timestamp - updatedAt <= 3600, "Price data is stale");
```

---


### Sanity Checks
Even if fresh, a price could be manipulated or erroneous. Contracts should perform basic sanity checks on the value itself.

**Implementation**: Check that the returned price is within a plausible range. At a minimum, check that the price is greater than zero. For more robust protection, a contract could store the previous price and revert if a new price deviates by an unexpectedly large percentage in a single update. This can serve as a defense against certain types of flash loan-based price manipulation attacks.

```solidity

require(price > 0, "Invalid price");
```


## Decimal and Unit Awareness
Oracles return prices as scaled integers to avoid floating-point arithmetic. A mismatch between the decimals expected by the contract and the decimals provided by the oracle will lead to severe miscalculations.

**Implementation**: Always verify the number of decimals for a given feed from the oracle's official documentation. Many oracle contracts also provide a public decimals() view function for on-chain verification. All calculations involving the price must account for this scaling factor.

# Architectural Resilience
Beyond validating the data itself, the contract should be architected to be resilient to oracle failures.

## Defensive External Calls
An external call to an oracle contract can fail for various reasons: the oracle may be paused for an upgrade, the transaction may run out of gas, or the contract may no longer exist. If such a call is not handled correctly, it can cause the entire consuming contract's function to revert, potentially leading to a Denial of Service (DoS) where critical functions of the application become unusable.

**Implementation**: Wrap all external calls to an oracle in a try/catch statement. This allows the contract to gracefully handle a failed call within the catch block. The contract can then revert with a more informative error message, attempt to use a fallback mechanism, or simply proceed without the data if the logic allows, thus remaining in control of its own execution flow.

## Circuit Breakers
For high-value protocols, it is prudent to implement a mechanism to halt critical functions in an emergency.

**Implementation**: Include a governance-controlled or owner-controlled function that can pause contract functionality dependent on the oracle. If a major price anomaly or oracle outage is detected off-chain, this "circuit breaker" can be triggered to prevent the protocol from being drained or exploited while the issue is investigated and resolved.

## Fallback Oracles
To build in redundancy, high-value applications can consider integrating more than one independent oracle provider.

**Implementation**: If the data from the primary oracle fails its validation checks (e.g., it is stale or out of bounds), the contract can then attempt to query a secondary oracle. While this significantly increases resilience, it also adds considerable complexity and gas cost, and requires careful management of which oracle to trust if their valid prices differ.

# Understanding Systemic Risks
Developers must also consider the systemic risks inherent in the oracle's design.

## Price Manipulation Vectors
The security of an oracle's data is only as strong as its sources. If an oracle derives its price from the spot price of an asset on a single, low-liquidity decentralized exchange (DEX), it may be vulnerable to price manipulation. An attacker could use a flash loan to execute a large trade, momentarily skewing the DEX's spot price, have the oracle report this manipulated price, and then use that price to exploit a target protocol (e.g., by borrowing assets against artificially inflated collateral).

**Mitigation**: Prefer oracles that aggregate data from multiple, high-quality, high-liquidity sources. Oracles that use Volume-Weighted Average Prices (VWAPs) are more resilient to manipulation than those using simple spot prices. Time-Weighted Average Prices (TWAPs) are another robust alternative, as they average prices over a period, making momentary manipulation much more difficult and expensive, though this comes at the cost of increased latency.

## Governance and Upgradeability Risks
The governance model of an oracle network is a potential attack vector. A developer must understand who has the power to upgrade the oracle's on-chain contracts, modify key parameters (like deviation thresholds), or add/remove node operators. A compromised or malicious governance process could directly compromise all dependent applications.

**Mitigation**: Scrutinize the oracle's documentation regarding its governance structure and the powers of any privileged admin roles. Prefer oracles with transparent governance processes and time-locks on critical changes.

## Shared Responsibility Model
A common misconception among developers is that choosing a reputable oracle provider absolves them of security responsibilities. This is incorrect.

The relationship between a dApp and its oracle is best understood as a Shared Responsibility Model, analogous to cloud computing:

The oracle network is responsible for the security of the oracle — ensuring node decentralization, data quality, and liveness.

The dApp developer is responsible for the security in the consumption of that oracle's data.

The consuming contract must enforce its own security policy by rigorously validating every piece of data it receives on-chain. A failure to check for staleness, sanity, or correct decimals is a vulnerability within the consuming contract, not necessarily a failure of the oracle itself.

Security is not outsourced; it is an integrated, collaborative effort.

---


# Advanced Oracle Services: Verifiable Randomness

Beyond providing data feeds, oracle networks offer a range of advanced off-chain computation services. One of the most critical is the provision of provably fair and verifiable random numbers, a task that is deceptively difficult to achieve securely on a deterministic blockchain.

---

## The On-Chain Randomness Problem

Blockchains are deterministic by design; every node must re-execute every transaction and arrive at the exact same state to maintain consensus. This inherent determinism makes generating true, unpredictable randomness directly on-chain impossible.

Naive attempts to source randomness from on-chain variables like `block.timestamp` or `blockhash` are fundamentally insecure. These values are either predictable to some degree or can be influenced or manipulated by block producers (miners or validators), who could discard blocks with unfavourable outcomes to benefit themselves or others.

This makes such methods unsuitable for any application where fairness is paramount, such as gaming, lotteries, or randomized NFT mints.

---

## Verifiable Random Function (VRF) as a Solution

### Concept

A Verifiable Random Function (VRF) is a cryptographic primitive that provides a secure solution to this problem.

A VRF is a public-key function that takes an input (a seed) and a secret key to produce a pseudorandom output. Crucially, it also generates a cryptographic proof that the output was generated correctly and authentically from that specific input using the corresponding secret key.

### Properties

- **Verifiable:** Anyone possessing the public key can use the proof to verify that the random number is authentic and has not been tampered with. This verification is a deterministic computation that can be performed on-chain.

- **Unpredictable:** The output appears random and is unpredictable to anyone who does not possess the secret key, even if they know the input seed.

---

## Oracle Integration

A decentralized oracle network like Chainlink leverages VRF to provide a tamper-proof randomness service to smart contracts. The process involves a request-response cycle where the smart contract requests randomness, and the oracle node generates the random number and its proof off-chain using its secret key.

The node then sends a transaction back to the consuming contract, which verifies the proof on-chain before using the random number.

---

## Implementing Chainlink VRF

The workflow for using Chainlink VRF (v2) involves a subscription model. A developer funds a subscription account with LINK tokens, and their consuming contracts are added as authorized consumers of that subscription.

### Workflow

1. A consumer contract makes a request for random numbers to the on-chain VRF Coordinator contract, specifying its subscription ID and other parameters like the number of random words required.

2. A Chainlink oracle node, monitoring the Coordinator, receives this request.

3. The oracle node waits for a specified number of block confirmations to ensure the request's seed (derived from the blockhash) is final. It then generates the random number(s) and the corresponding proof using its secret key.

4. The oracle node submits a transaction back to the Coordinator, which verifies the proof.

5. If the proof is valid, the Coordinator calls the `fulfillRandomWords` function on the original consumer contract, delivering the secure random numbers.

---

## Code Example: Chainlink VRF Consumer
The following contract demonstrates the basic structure for requesting and receiving random numbers from Chainlink VRF v2.

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";

contract VrfConsumer is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // Address of the VRF Coordinator on the given network.
    address vrfCoordinator;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    bytes32 keyHash;

    // The number of confirmations the VRF node should wait.
    uint16 constant REQUEST_CONFIRMATIONS = 3;

    // The number of random values to request.
    uint32 constant NUM_WORDS = 2;

    // Storage for received random words
    uint256 public s_randomWords;
    uint256 public s_lastRequestId;

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256 randomWords);

    constructor(uint64 subscriptionId, address _vrfCoordinator, bytes32 _keyHash) VRFConsumerBaseV2(_vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        s_subscriptionId = subscriptionId;
        vrfCoordinator = _vrfCoordinator;
        keyHash = _keyHash;
    }

    function requestRandomWords() public {
        s_lastRequestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            REQUEST_CONFIRMATIONS,
            500000, // callback gas limit
            NUM_WORDS
        );
        emit RequestSent(s_lastRequestId, NUM_WORDS);
    }

    function fulfillRandomWords(uint256 _requestId, uint256 memory _randomWords) internal override {
        s_randomWords = _randomWords;
        emit RequestFulfilled(_requestId, s_randomWords);
    }
}


```


---


# Use Cases and Alternatives for Verifiable Randomness

Verifiable randomness is a foundational component for a wide range of on-chain applications. It is critical for:

---

## Use Cases

- **Blockchain Gaming:**  
  Powering fair and unpredictable outcomes, such as random loot box drops, procedural map generation, or determining critical hit chances.

- **NFTs:**  
  Assigning random traits and attributes during the minting process to create rarity and uniqueness, as famously used by projects like Bored Ape Yacht Club.

- **Fair Selection:**  
  Any process that requires the random and unbiased selection of participants, such as choosing winners in a lottery, selecting jurors for a decentralized court, or distributing highly sought-after assets.

---

## Alternative Oracle Solutions for Randomness

Other oracle providers offer alternative solutions for randomness, including:

- **Pyth Network:**  
  Provides *Pyth Entropy*, which uses a two-party commit-reveal scheme to generate random numbers.

- **Band Protocol:**  
  Offers its own VRF service built on BandChain.

---
