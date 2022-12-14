import React, { useState } from 'react';
import './related-taxonomy.scss';
import { Box, Select, MenuItem } from '@material-ui/core';
import { useNotOnMountEffect } from '../../services/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getSelectedChilds } from '../../../site/news/services/news.service';

interface RelatedTaxonomyProps {
  selectedTaxonomy?: any;
  taxonomyTree: any;
  onRemove?: () => void;
  onAdd?: (id: string | undefined) => void;
}

export default function RelatedTaxonomy(
  props: RelatedTaxonomyProps
): JSX.Element {

  const getDomain = () => {
    return props.selectedTaxonomy ? props.selectedTaxonomy.uuid : '';
  };

  const getCategory = () => {
    return props.selectedTaxonomy && props.selectedTaxonomy.child.length > 0
      ? props.selectedTaxonomy.child[0].uuid
      : '';
  };

  const getSubject = () => {
    return props.selectedTaxonomy &&
      props.selectedTaxonomy.child.length > 0 &&
      props.selectedTaxonomy.child[0].child.length > 0
      ? props.selectedTaxonomy.child[0].child[0].uuid
      : '';
  };

  const [domain, setDomain] = useState<any>(getDomain());
  const [category, setCategory] = useState<any>(getCategory());
  const [subject, setSubject] = useState<any>(getSubject());

  useNotOnMountEffect(() => {
    setCategory('');
    setSubject('');
  }, [domain]);

  useNotOnMountEffect(() => {
    setSubject('');
  }, [category]);

  const mapOptions = (taxonomy?: any[]) => {
    if (taxonomy) {
      return taxonomy.map((option: any) => (
        <MenuItem key={option.uuid} value={option.uuid}>
          <em>{option.descriptionnl}</em>
        </MenuItem>
      ));
    } else {
      return [];
    }
  };

  return (
    <Box
      display="flex"
      flex={1}
      className="taxonomy-row"
      justifyContent="space-between"
    >
      <Select
        id="domain-taxonomy"
        cy-data="domain-taxonomy"
        className={props.selectedTaxonomy ? 'active-taxonomy' : ''}
        variant="outlined"
        disabled={!props.onAdd}
        value={domain}
        onChange={(evt: any) => setDomain(evt.target.value)}
      >
        {mapOptions(props.taxonomyTree)}
      </Select>
      <Select
        id="category-taxonomy"
        variant="outlined"
        className={props.selectedTaxonomy ? 'active-taxonomy' : ''}
        disabled={!(props.onAdd && domain && !props.onRemove)}
        value={category}
        onChange={(evt: any) => setCategory(evt.target.value)}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {mapOptions(getSelectedChilds(props.taxonomyTree, domain))}
      </Select>
      <Select
        id="subject-taxonomy"
        variant="outlined"
        className={props.selectedTaxonomy ? 'active-taxonomy' : ''}
        disabled={!(props.onAdd && category && !props.onRemove)}
        value={subject}
        onChange={(evt: any) => setSubject(evt.target.value)}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {mapOptions(getSelectedChilds(props.taxonomyTree, domain, category))}
      </Select>
      <span>
        {props.onRemove ? (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => (props.onRemove ? props.onRemove() : null)}
          />
        ) : (
          <FontAwesomeIcon
            data-cy="save-domain-taxonomy"
            className={domain ? 'add-enabled' : 'add-disabled'}
            icon={faPlus}
            onClick={() =>
              props.onAdd && domain
                ? props.onAdd(subject ? subject : category ? category : domain)
                : null
            }
          />
        )}
      </span>
    </Box>
  );
}
