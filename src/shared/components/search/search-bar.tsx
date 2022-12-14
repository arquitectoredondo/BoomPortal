import React, { useState, ChangeEvent } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import './search-bar.scss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import { searchPublication } from '../../../site/catalog/services/portal-catalog.service';
import { Publication } from '../../../site/catalog/models/portal.catalog.model';
import { useNotOnMountEffect } from '../../services/utils';
import { searchThemePublication } from '../../../site/themes/services/themeCatalog.service';
import { searchPortalWidgetPublication } from '../../../site/pages/services/page-details.service';

interface SearchProps {
  onAddPublications: (value: Publication) => void;
  isPortal: boolean;
  isWidget: boolean;
  required?: boolean;
  error?: boolean;
  onInvalid?: (value: any) => void;
  onInput?: (value: any) => void;
  InputLabelProps?: any;
  helperText?: string;
}

export default function SearchBar(props: SearchProps): JSX.Element {
  let { portalUuid, themeId } = useParams<{
    portalUuid: string;
    themeId: string;
  }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [publicationList, setPublicationList] = useState<Publication[]>([]);

  useNotOnMountEffect(() => {
    setLoading(true);
    if (props.isPortal && !props.isWidget) {
      searchPublication(searchTerm)
        .then((res: any) => {
          setPublicationList(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    if (
      (props.isPortal && props.isWidget) ||
      (!props.isPortal && !props.isWidget)
    ) {
      searchThemePublication(searchTerm, portalUuid ? portalUuid : '')
        .then((res: any) => {
          setPublicationList(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    if (!props.isPortal && props.isWidget) {
      searchPortalWidgetPublication(searchTerm, themeId ? themeId : '')
        .then((res: any) => {
          setPublicationList(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    // eslint-disable-next-line
  }, [searchTerm]);

  const findPublication = (value: string) => {
    let selection = publicationList.find(
      (publication: Publication) => publication.title === value
    );
    if (selection) {
      props.onAddPublications(selection);
    }
  };

  const handleSelectionAutocomplete = (
    event: ChangeEvent<{}>,
    value: string | null
  ) => {
    if (value !== null) {
      findPublication(value);
      setSearchTerm('');
    }
  };

  return (
    <div className='search-card'>
      <Autocomplete
        clearOnEscape
        id='search'
        value={searchTerm}
        options={publicationList.map(
          (publication: Publication) => publication.title
        )}
        onChange={handleSelectionAutocomplete}
        loading={loading}
        renderInput={(params: any) => (
          <TextField
            {...params}
            required={props!.required}
            error={props!.error}
            onInvalid={props!.onInvalid}
            helperText={props!.helperText}
            InputLabelProps={props!.InputLabelProps}
            onInput={props!.onInput}
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            onBlur={() => setSearchTerm('')}
            label='Search publications'
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress id='pending' color='inherit' size={20} />
                  ) : (
                    <FontAwesomeIcon icon={faSearch} className='search-icon' />
                  )}
                </React.Fragment>
              ),
            }}
            fullWidth
          ></TextField>
        )}
      />
    </div>
  );
}
