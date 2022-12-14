import React, { useState, ChangeEvent } from "react";
import "./related-publication.scss";
import { Box, CircularProgress, TextField } from "@material-ui/core";
import { NewRelatedPublication } from "../../model/news.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { searchNewsPublications } from "../../services/news.service";
import { useParams } from "react-router-dom";

interface RelatedPublicationProps {
  relatedPublications: NewRelatedPublication[] | undefined;
  onRemove: (index: number) => void;
  onAdd: (id: string | undefined) => void;
}

export default function RelatedPublications(
  props: RelatedPublicationProps
): JSX.Element {
  let { portalUuid } = useParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<NewRelatedPublication[]>(
    []
  );

  React.useEffect(() => {
    setLoading(true);
    searchNewsPublications(portalUuid, searchTerm)
      .then((result: any) => {
        setSearchResults(result.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line
  }, [searchTerm]);

  const publicationLoop = () => {
    if (props.relatedPublications) {
      return props.relatedPublications.map(
        (publication: NewRelatedPublication, i: number) => (
          <Box id="publications" display="flex" className="publication-row">
            <span>{publication.title}</span>
            <span>{publication.author}</span>
            <span>
              {publication.type}
              <span>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => props.onRemove(i)}
                />
              </span>
            </span>
          </Box>
        )
      );
    }
  };

  const handleSelectionAutocomplete = (
    event: ChangeEvent<{}>,
    value: string | null
  ) => {
    if (value && value !== "") {
      const uuidSelected:
        | NewRelatedPublication
        | undefined = searchResults.find(
        (publication: NewRelatedPublication) => publication.title === value
      );
      props.onAdd(uuidSelected?.id);
      setSearchTerm("");
    }
  };

  return (
    <Box display="flex" flex={1} flexDirection="column">
      <Autocomplete
        clearOnEscape
        id="search"
        className="form-autocomplete"
        value={searchTerm}
        options={searchResults.map(
          (option: NewRelatedPublication) => option.title
        )}
        onChange={handleSelectionAutocomplete}
        loading={loading}
        renderInput={(params: any) => (
          <TextField
            {...params}
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            variant="outlined"
            className="form-label-textfield"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress id="pending" color="inherit" size={20} />
                  ) : (
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  )}
                </React.Fragment>
              ),
            }}
            fullWidth
          ></TextField>
        )}
      />
      {publicationLoop()}
    </Box>
  );
}
