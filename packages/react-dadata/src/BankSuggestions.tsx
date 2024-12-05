import React, { type ReactNode } from 'react';
import { type BaseProps, BaseSuggestions } from './BaseSuggestions';
import { HighlightWords } from './HighlightWords';
import type { DaDataBank, DaDataBankStatus, DaDataBankType, DaDataSuggestion } from './types';

type Dictionary = { [key: string]: unknown };

interface Props extends BaseProps<DaDataBank> {
  filterStatus?: DaDataBankStatus[];
  filterType?: DaDataBankType[];
  filterLocations?: Dictionary[];
  filterLocationsBoost?: Dictionary[];
  host?: string;
}

export class BankSuggestions extends BaseSuggestions<DaDataBank, Props> {
  loadSuggestionsUrl: string = this.props.host 
    ? `${this.props.host}/suggestions/api/4_1/rs/suggest/bank`
    : 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank';

  getLoadSuggestionsData = (): Record<string, unknown> => {
    const { count, filterStatus, filterType, filterLocations, filterLocationsBoost } = this.props;
    const { query } = this.state;

    const requestPayload: Record<string, unknown> = {
      query,
      count: count || 10,
    };

    // Ограничение по статусу организации
    if (filterStatus) {
      requestPayload.status = filterStatus;
    }

    // Ограничение по типу организации
    if (filterType) {
      requestPayload.type = filterType;
    }

    // Сужение области поиска
    if (filterLocations) {
      requestPayload.locations = filterLocations;
    }

    // Приоритет города при ранжировании
    if (filterLocationsBoost) {
      requestPayload.locations_boost = filterLocationsBoost;
    }

    return requestPayload;
  };

  protected getSuggestionKey = (suggestion: DaDataSuggestion<DaDataBank>): string => `${suggestion.data.bic}`;

  protected renderOption = (suggestion: DaDataSuggestion<DaDataBank>): ReactNode => {
    const { renderOption, highlightClassName } = this.props;
    const { query } = this.state;

    return renderOption ? (
      renderOption(suggestion, query)
    ) : (
      <div>
        <div
          className={
            suggestion.data.state.status === 'LIQUIDATED' ? 'react-dadata__suggestion--line-through' : undefined
          }
        >
          <HighlightWords
            highlightClassName={highlightClassName || 'react-dadata--highlighted'}
            words={this.getHighlightWords()}
            text={suggestion.value}
          />
        </div>
        <div className="react-dadata__suggestion-subtitle">
          {suggestion.data.bic && <div className="react-dadata__suggestion-subtitle-item">{suggestion.data.bic}</div>}
          {suggestion.data.address?.value && (
            <div className="react-dadata__suggestion-subtitle-item">
              <HighlightWords
                highlightClassName={highlightClassName || 'react-dadata--highlighted'}
                words={this.getHighlightWords()}
                text={suggestion.data.address.value}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
}
