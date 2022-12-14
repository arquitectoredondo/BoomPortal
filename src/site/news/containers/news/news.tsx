import React, { useState } from 'react';
import './news.scss';
import { connect } from 'react-redux';
import { AppState } from '../../../../core/store/store';
import {
  loadNews,
  loadNewsSuccess,
  loadNewsFailure,
} from '../../store/actions/news.actions';
import { PortalNew } from '../../model/news.model';
import { getNews } from '../../services/news.service';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  OutlinedInput,
  InputLabel,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import AdminTable from '../../../../shared/components/portal-table/admin-table';
import {
  selectNews,
  selectNewsLoading,
  selectNewsError,
  selectNewsErrorMsg,
} from '../../store/selectors/news.selectors';
import ContainerTemplate from '../../../../shared/components/container-template/container-template';
import { resetNewsDetails } from '../../store/actions/news-details.actions';
import { AxiosError } from 'axios';
import { resetThemeSettings } from '../../../themes/store/actions/theme-settings.actions';
import { themeIsSelected } from '../../../themes/store/actions/theme.actions';

interface NewsProps {
  resetThemeSettings: typeof resetThemeSettings;
  themeIsSelected: typeof themeIsSelected;
  loadNews: typeof loadNews;
  loadNewsSuccess: typeof loadNewsSuccess;
  loadNewsFailure: typeof loadNewsFailure;
  resetNewsDetails: typeof resetNewsDetails;
  news: PortalNew[];
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

const headers = [
  {
    label: 'News',
    value: 'title',
  },
  {
    label: 'Created By',
    value: 'createdBy',
  },
  {
    label: 'Publication Date',
    value: 'publicationDate',
  },
];
export function News(props: NewsProps): JSX.Element {
  const { t } = useTranslation();
  let { portalUuid } = useParams<{ portalUuid: string }>();
  let history = useHistory();

  const [filters, setFilters] = useState({
    onlyEvents: false,
    domain: undefined,
    searchTerm: '',
    page: 1,
    pageSize: 20,
  });
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef<HTMLLabelElement>(null);

  const [count, setCount] = React.useState(0);

  const searchNews = () => {
    props.loadNews();
    getNews({ portalUuid, ...filters })
      .then((result: any) => {
        props.loadNewsSuccess(result.data.content);
        setCount(result.data.totalHits);
      })
      .catch((error: AxiosError) =>
        props.loadNewsFailure(error.response?.data.errorMessage)
      );
  };

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!?.offsetWidth);
    searchNews();
    props.resetThemeSettings();
    props.themeIsSelected(false);
    // eslint-disable-next-line
  }, [filters.domain, filters.onlyEvents, filters.searchTerm, filters.page]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const goToCreation = () => {
    props.resetNewsDetails();
    history.push(`/site/${portalUuid}/news/newCreation/`);
  };

  const goToDetails = (id: string) => {
    history.push(`/site/${portalUuid}/news/${id}`);
  };

  const newsDataDateTransform = () => {
    let newsTransformed = props.news.map((news: any) => {
      return {
        ...news,
        publicationDate: news.publicationDate
          ? new Date(news.publicationDate.slice(0, 10)).toDateString()
          : 'Unpublished',
      };
    });
    return newsTransformed;
  };

  return (
    <div className="layout-list news-body">
      <Box
        className="list-title"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <span>{t('news.title')}</span>
        <Box flex={1}></Box>
        <div>
          <Checkbox
            id="event-checkbox"
            className="form-checkbox"
            checked={filters.onlyEvents}
            onChange={(evt) => {
              handleFilterChange('onlyEvents', evt.target.checked);
            }}
            color="primary"
          />
          <span className="checkbox-label">{t('news.onlyEventFilter')}</span>
        </div>
        <FormControl
          variant="outlined"
          className="form-label-selectfield domain-selector"
        >
          <InputLabel ref={inputLabel}>{t('news.domainFilter')}</InputLabel>
          <Select
            labelWidth={labelWidth}
            id="news-domain"
            value={filters.domain}
            onChange={(evt: any) =>
              handleFilterChange('domain', evt.target.value)
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className="form-label-textfield">
          <OutlinedInput
            id="search-field"
            value={filters.searchTerm}
            onChange={(evt: any) =>
              handleFilterChange('searchTerm', evt.target.value)
            }
            placeholder={t('news.searchFilterPH')}
            endAdornment={
              <InputAdornment position="end">
                <FontAwesomeIcon size="sm" icon={faSearch} />
              </InputAdornment>
            }
          />
        </FormControl>

        <Button id="add-button" onClick={() => goToCreation()}>
          <FontAwesomeIcon size="lg" icon={faPlus} />
        </Button>
      </Box>
      <div>
        <ContainerTemplate loading={props.loading} error={props.error}>
          <AdminTable
            headers={headers}
            data={newsDataDateTransform()}
            onRowClicked={(row: any) => {
              goToDetails(row.uuid);
            }}
            currentPage={filters.page - 1}
            totalItems={count}
            itemsPerPage={filters.pageSize}
            onPageChange={(value: number) =>
              handleFilterChange('page', value + 1)
            }
          />
        </ContainerTemplate>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  news: selectNews(state),
  loading: selectNewsLoading(state),
  error: selectNewsError(state),
  errorMsg: selectNewsErrorMsg(state),
});

export default connect(mapStateToProps, {
  resetThemeSettings,
  themeIsSelected,
  loadNews,
  loadNewsSuccess,
  loadNewsFailure,
  resetNewsDetails,
})(News);
