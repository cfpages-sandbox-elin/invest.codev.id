# Topical Authority — invest.codev.id

## Role and boundary

`invest.codev.id` is a specialist educational and product-support property for comparing historical investment performance across index funds, commodities, crypto assets, and currencies. It should help readers understand measurement choices, uncertainty, data limitations, risk, diversification, costs, and responsible use of the comparator. The live tool owns asset selection, period/base-asset inputs, calculations, charts, and result displays; articles explain concepts and interpretation without giving personalized recommendations or presenting historical winners as suitable future choices. Prices, returns, tax and legal claims, product availability or structure, suitability, risk metrics, and all current market or product assertions must be date-stamped, supported by authoritative sources, and reviewed by a qualified financial, tax, or legal professional as applicable before publication.

## Context used

- The repository is a single-route React/Vite comparison tool with no sitemap or static editorial route family.
- Visible product headings are “Investment Performance Comparator,” “Select Investments,” “Performance Comparison,” “Growth Over Time,” and “Total Performance Summary.”
- The selector exposes 4 asset families and 20 instruments: index-fund ETFs, commodities, cryptocurrencies, and currencies against USD.
- Users choose an investment period and a base asset; results describe normalized growth of 100 units and display a “Clear Winner.”
- The “Clear Winner” framing creates a material interpretation risk. It informed dedicated methodology, suitability, and result-reading topics, but did not require a deep corpus audit because no existing editorial corpus or route conflict exists.

## Ignored template noise

- No sitemap, article, archive, tag, author, pagination, feed, or location-swapped route families are tracked.
- Framework configuration, generic AI Studio README text, icons, styles, package metadata, and service implementation details were not treated as editorial coverage.
- The 20 selectable tickers are product examples, not 20 article families and not evidence that any instrument is currently available, suitable, or correctly described.
- Repeated chart labels and generated result bodies were not audited; the plan treats all outputs as historical comparison illustrations requiring methodology disclosure.

## Topical map

| Topic ID | Parent topic | Reader outcome | Boundary | Article target |
|---|---|---|---|---:|
| INV-01 | Dasar perbandingan investasi | Understand what can and cannot be concluded when two or more assets are compared. | Owns comparison orientation; formulas belong to INV-02, methodology controls to INV-05, and tool operation to INV-16. | 6 |
| INV-02 | Return, pertumbuhan, dan compounding | Calculate and distinguish cumulative, annualized, real, and cash-flow-sensitive returns. | Owns return measurement; uncertainty and downside belong to INV-03 and costs to INV-13. | 6 |
| INV-03 | Risiko, volatilitas, dan drawdown | Evaluate loss depth, variability, recovery, and uncertainty instead of relying on final return alone. | Owns risk measurement and interpretation; portfolio interaction belongs to INV-11 and personal risk capacity to INV-15. | 6 |
| INV-04 | Inflasi, mata uang, dan base asset | Understand how purchasing power, exchange rates, and the chosen denominator change apparent performance. | Owns real-return and denomination effects; currency as an asset family belongs to INV-10. | 6 |
| INV-05 | Data, metodologi, dan benchmark | Judge data provenance, dates, missing values, corporate actions, benchmarks, and reproducibility. | Owns evidence quality; the interface workflow belongs to INV-16 and product due diligence to INV-14. | 6 |
| INV-06 | Horizon waktu dan sensitivitas periode | Test how start date, end date, market regime, and holding period affect the ranking. | Owns period dependence and scenarios; compounding formulas belong to INV-02 and suitability to INV-15. | 6 |
| INV-07 | Index fund dan ETF | Understand index exposure, ETF structure, tracking, concentration, and product-comparison questions. | Owns index-linked funds; portfolio allocation belongs to INV-12 and current product claims require INV-14 review. | 6 |
| INV-08 | Komoditas | Compare precious metals, energy, and agricultural exposure by drivers, structure, and risk. | Owns commodity characteristics; inflation comparison belongs to INV-04 and portfolio role to INV-11/INV-12. | 6 |
| INV-09 | Aset kripto | Evaluate crypto return data, custody, liquidity, concentration, protocol, and extreme-risk questions. | Owns crypto-specific mechanics and risks; personalized suitability belongs to INV-15 and current legal/product status to INV-14. | 6 |
| INV-10 | Mata uang dan valuta asing | Interpret currency performance, quotations, interest differentials, and FX exposure. | Owns currencies as a market exposure; base-currency measurement belongs to INV-04 and trading costs to INV-13. | 6 |
| INV-11 | Diversifikasi dan korelasi | Understand how assets move together and why a single historical winner does not define a portfolio. | Owns cross-asset relationships; target weights and rebalancing belong to INV-12. | 6 |
| INV-12 | Alokasi aset dan rebalancing | Translate goals and constraints into a reviewable allocation process without prescribing a personalized portfolio. | Owns portfolio construction mechanics; suitability assessment belongs to INV-15 and asset fundamentals to INV-07–INV-10. | 6 |
| INV-13 | Biaya, spread, likuiditas, dan implementasi | Estimate how fees, bid-ask spreads, slippage, taxes withheld, and execution constraints affect realized outcomes. | Owns transaction and holding frictions; tax/legal interpretation belongs to INV-14 and raw return formulas to INV-02. | 6 |
| INV-14 | Pajak, legalitas, dan due diligence produk | Verify current product identity, provider, documents, regulation, tax treatment, and investor protections. | Owns verification workflow, not definitive legal/tax advice; suitability belongs to INV-15 and methodology to INV-05. | 6 |
| INV-15 | Tujuan, suitability, dan perilaku investor | Match decisions to goals, capacity for loss, knowledge, liquidity needs, and behavioral risks. | Owns decision context without personalized advice; asset facts belong to INV-07–INV-10 and allocation mechanics to INV-12. | 6 |
| INV-16 | Penggunaan comparator dan interpretasi hasil | Configure comparisons, read charts, challenge “winner” labels, and document limitations responsibly. | Owns tool workflow and output literacy; underlying formulas belong to INV-02–INV-06 and transactions remain outside the tool. | 6 |

## Internal-link rule

Every article links upward to its INV topic hub. INV-01 routes readers through measurement (INV-02–INV-06), asset-specific characteristics (INV-07–INV-10), and portfolio decisions (INV-11–INV-15). Each asset page links to data methodology, risk, costs, current-product due diligence, and suitability before any comparator call to action. INV-16 tool guides link back to the exact measurement topic needed to interpret each output; no “winner” page links directly to a purchase or implies a recommendation.

## First publication wave

Publish a coherent 12-asset interpretation foundation: `INV-01-01`, `INV-01-02`, `INV-02-01`, `INV-02-02`, `INV-03-01`, `INV-03-02`, `INV-04-01`, `INV-05-01`, `INV-05-02`, `INV-06-01`, `INV-15-01`, and `INV-16-01`. This wave teaches readers what historical comparison means, how return and downside are measured, why denomination and dates matter, how to inspect data quality, and why a displayed winner is neither a forecast nor a suitability conclusion.
