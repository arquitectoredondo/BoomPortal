import React, { useState } from "react";
import "./catalog.scss";
import { useTranslation } from "react-i18next";
import {
  NativeSelect,
  Box,
  Button,
  Checkbox,
  Switch,
  Divider,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../search/search-bar";
import { Publication } from "../../../site/catalog/models/portal.catalog.model";
import { useNotOnMountEffect } from "../../services/utils";
import RelatedTaxonomy from "../related-taxonomy/related-taxonomy";
import { getTaxonomyLowerLevel } from "../../../site/news/services/news.service";
import { CatalogSettings } from "../../models/catalog.model";

export interface CatalogProps {
  data: CatalogSettings | undefined;
  onSaveChanges: (value: any) => void;
  yearList?: number[];
  isPortal: boolean;
}

export default function Catalog(props: CatalogProps): JSX.Element {
  const { t } = useTranslation();
  const yearsList = props.yearList;
  const [yearFilter, setYearFilter] = useState<number | undefined>();
  const [settings, setSettings] = useState(props.data);
  const [taxonomyRelated, setTaxonomyRelated] = useState<string[]>([]);

  const initTaxonomyRelated = (assignedTaxonomies: any) => {
    if (assignedTaxonomies) {
      let taxonomySelection: any[] = [];
      // eslint-disable-next-line
      assignedTaxonomies.map((taxonomy: any) => {
        taxonomySelection.push(getTaxonomyLowerLevel(taxonomy));
      });
      setTaxonomyRelated(taxonomySelection);
    }
  };

  React.useEffect(() => {
    initTaxonomyRelated(props.data?.assignedTaxonomies);
    // eslint-disable-next-line
  }, []);

  useNotOnMountEffect(() => {
    update();
    // eslint-disable-next-line
  }, [
    settings?.assignedTaxonomies?.length,
    settings?.publications?.length,
    settings?.openAccess,
    settings?.authorizingEbooks,
    settings?.authorizingJournals,
    settings?.authorizingJournalArticles,
    settings?.authorizingDatabases,
    settings?.authorizingDatabaseArticles,
    settings?.years?.length,
  ]);

  const update = () => {
    let updateData = {
      uuid: settings?.uuid,
      openAccess: settings?.openAccess,
      authorizingEbooks: settings?.authorizingEbooks,
      authorizingJournals: settings?.authorizingJournals,
      authorizingJournalArticles: settings?.authorizingJournalArticles,
      authorizingDatabases: settings?.authorizingDatabases,
      authorizingDatabaseArticles: settings?.authorizingDatabaseArticles,
      years: settings?.years,
      publicationIdList: settings?.publications.map(
        (publication: Publication) => publication.id
      ),
      taxonomyIdList: taxonomyRelated,
    };
    props.onSaveChanges(updateData);
  };
  const handleChanges = (key: string, value: any) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  const handleYearChange = (event: React.ChangeEvent<{ value: any }>) => {
    setYearFilter(event.target.value);
  };

  const handleDeleteYear = (index: number) => {
    if (settings) {
      let copyYearsFilter = settings.years;
      copyYearsFilter.splice(index, 1);
      setSettings({ ...settings, years: copyYearsFilter });
    }
  };

  const handleAddYear = () => {
    if (settings && yearFilter) {
      setSettings({
        ...settings,
        years: [...(settings.years ? settings.years : []), yearFilter],
      });
      setYearFilter(undefined);
    }
  };

  const handleAddPublication = (value: Publication) => {
    if (settings) {
      setSettings({
        ...settings,
        publications: [
          ...(settings.publications ? settings.publications : []),
          value,
        ],
      });
    }
  };

  const handleDeletePublication = (index: any) => {
    if (settings) {
      let copyPublications = settings.publications;
      copyPublications.splice(index, 1);
      setSettings({ ...settings, publications: copyPublications });
    }
  };

  const taxonomyLoop = () => {
    if (props.data && props.data.assignedTaxonomies) {
      return props.data.assignedTaxonomies.map((taxonomy: any, i: number) => (
        <RelatedTaxonomy
          key={`${taxonomy.uuid}-${i}`}
          selectedTaxonomy={taxonomy}
          taxonomyTree={props.data?.taxonomyTree}
          onRemove={() => removeTaxonomy(i)}
        />
      ));
    }
  };

  const removeTaxonomy = (index: number) => {
    const removed: string[] = Array.from(taxonomyRelated);
    removed.splice(index, 1);
    setTaxonomyRelated(removed);
    handleChanges("assignedTaxonomies", removed);
  };

  const addTaxonomy = (id: string | undefined) => {
    const added: string[] = Array.from(taxonomyRelated);
    added.push(id ? id : "");
    setTaxonomyRelated(added);
    handleChanges("assignedTaxonomies", added);
  };

  return (
    <div>
      <Box className="filters-body" flexDirection="column">
        <div>
          <div className="title">{t("themeFilters.openAccessContent")}</div>
          <Box display="flex" flexDirection="flex-start" p={1}>
            <Box p={1}>{t("themeFilters.onlyOpenAccess")}</Box>
            <Box p={1}>
              <Switch
                id="allContent-switch"
                data-cy="openAccess"
                disabled={settings?.openAccess === null}
                checked={!settings?.openAccess}
                onChange={(evt: any) =>
                  handleChanges("openAccess", !settings?.openAccess)
                }
                color="primary"
              />
            </Box>
            <Box p={1}>
              <div>{t("themeFilters.allContent")}</div>
            </Box>
          </Box>
        </div>

        <div>
          <div className="title">{t("themeFilters.publicationType")}</div>
          <Box display="flex" flex-direction="column">
            <Box flexGrow={1} p={1}>
              <Checkbox
                id="book-checkbox"
                data-cy="book"
                disabled={settings?.authorizingEbooks === null}
                checked={settings?.authorizingEbooks}
                onChange={(evt: any) =>
                  handleChanges(
                    "authorizingEbooks",
                    !settings?.authorizingEbooks
                  )
                }
                color="primary"
              />
              <label>{t("themeFilters.book")}</label>
            </Box>
            <Box flexGrow={1} p={1}>
              <Checkbox
                id="journal-checkbox"
                data-cy="journal"
                disabled={settings?.authorizingJournals === null}
                checked={settings?.authorizingJournals}
                onChange={(evt: any) =>
                  handleChanges(
                    "authorizingJournals",
                    !settings?.authorizingJournals
                  )
                }
                color="primary"
              />
              <label>{t("themeFilters.journal")}</label>
            </Box>
            <Box flexGrow={1} p={1}>
              <Checkbox
                id="journalArticle-checkbox"
                data-cy="journalArticle"
                disabled={settings?.authorizingJournalArticles === null}
                checked={settings?.authorizingJournalArticles}
                onChange={(evt: any) =>
                  handleChanges(
                    "authorizingJournalArticles",
                    !settings?.authorizingJournalArticles
                  )
                }
                color="primary"
              />
              <label>{t("themeFilters.journalArticle")}</label>
            </Box>
            <Box flexGrow={1} p={1}>
              <Checkbox
                id="database-checkbox"
                data-cy="database"
                disabled={settings?.authorizingDatabases === null}
                checked={settings?.authorizingDatabases}
                onChange={(evt: any) =>
                  handleChanges(
                    "authorizingDatabases",
                    !settings?.authorizingDatabases
                  )
                }
                color="primary"
              />
              <label>{t("themeFilters.databases")}</label>
            </Box>
            <Box flexGrow={1} p={1}>
              <Checkbox
                id="databaseArticle-checkbox"
                data-cy="databaseArticle"
                disabled={settings?.authorizingDatabaseArticles === null}
                checked={settings?.authorizingDatabaseArticles}
                onChange={(evt: any) =>
                  handleChanges(
                    "authorizingDatabaseArticles",
                    !settings?.authorizingDatabaseArticles
                  )
                }
                color="primary"
              />
              <label>{t("themeFilters.databasesArticle")}</label>
            </Box>
          </Box>
        </div>

        <div>
          <div className="title">{t("themeFilters.year")}</div>
          <div>
            {settings?.years &&
              settings?.years.map((year: number, i: number) => (
                <Box
                  key={i}
                  display="flex"
                  flex-direction="column"
                  className="years-select"
                >
                  <Box>
                    <NativeSelect
                      id="year-selected"
                      className="selectors"
                      value={year}
                    >
                      <option id="year-selected-option">{year}</option>
                    </NativeSelect>
                  </Box>
                  <Box>
                    <Button
                      id="deleteYear-button"
                      onClick={(e) => handleDeleteYear(i)}
                    >
                      <FontAwesomeIcon className="trash-icon" icon={faTrash} />
                    </Button>
                  </Box>
                </Box>
              ))}

            <Box
              display="flex"
              flex-direction="column"
              className="years-select"
            >
              <Box>
                <NativeSelect
                  id="year-selector"
                  className="selectors"
                  value={yearFilter}
                  onChange={handleYearChange}
                >
                  <option>{"Select a year"}</option>

                  {yearsList?.map((year: number, i: number) => (
                    <option id="year-display" key={i}>
                      {year}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
              <Box>
                <Button
                  id="addYear-button"
                  data-cy="addYear-button"
                  onClick={handleAddYear}
                >
                  <FontAwesomeIcon className="trash-icon" icon={faPlus} />
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      </Box>
      <div>
        <div className="title">{t("themesCatalog.publications")}</div>
        <SearchBar
          isWidget={false}
          isPortal={props.isPortal}
          onAddPublications={handleAddPublication}
        />
      </div>
      {settings?.publications && (
        <div>
          {settings?.publications.map(
            (publication: Publication, index: any) => (
              <>
                <Box key={index} display="flex" flex-direction="column">
                  <Box width={"30%"} className="publication-item">
                    <div id="publication-title">{publication.title}</div>
                  </Box>
                  <Box width={"30%"} className="publication-item">
                    <div id="publication-author">
                      {publication.author?.toString()}
                    </div>
                  </Box>
                  <Box width={"15%"} className="publication-item">
                    <div id="publication-type">{publication.type}</div>
                  </Box>
                  <Box width={"15%"} className="publication-item">
                    <div id="publication-id">{publication.id}</div>
                  </Box>
                  <Box width={"10%"} className="publication-item">
                    <Button
                      id="deletePublication-button"
                      onClick={(a) => handleDeletePublication(index)}
                    >
                      <FontAwesomeIcon className="trash-icon" icon={faTrash} />
                    </Button>
                  </Box>
                </Box>
                <Divider light />
              </>
            )
          )}
        </div>
      )}

      <div className="taxonomie">
        <div className="title">{t("themesCatalog.taxonomy")}</div>
        <Box>
          {taxonomyLoop()}
          <RelatedTaxonomy
            taxonomyTree={props.data ? props.data.taxonomyTree : []}
            onAdd={addTaxonomy}
          />
        </Box>
      </div>
    </div>
  );
}
