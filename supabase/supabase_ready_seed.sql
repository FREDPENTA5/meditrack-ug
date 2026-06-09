--
-- PostgreSQL database dump
--

\restrict zrtEHbgsb7T8M0AmGOGXmoEWpbtBYFhBc6A9I9Pbmv4dsSTPAPdbIdRFhMDamEp

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: District; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.districts VALUES ('cmq6l00xi0000alsglzvowss2', 'Wakiso', 'Central', '2026-06-09 11:53:41.043');
INSERT INTO public.districts VALUES ('cmq6ma42d0001al9gjm4stqad', 'Kampala', 'Central', '2026-06-09 12:29:31.286');
INSERT INTO public.districts VALUES ('cmq6ma4370002al9giev72ufj', 'Mukono', 'Central', '2026-06-09 12:29:31.315');


--
-- Data for Name: Facility; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.facilities VALUES ('cmq6l00y50002alsgh05s36p9', 'Gayaza Hospital', 'WAK-GAY-001', 'GENERAL_HOSPITAL', 'cmq6l00xi0000alsglzvowss2', 0.4167, 32.6333, 'Gayaza, Wakiso District', '+256700000001', '2026-06-09 11:53:41.069', '2026-06-09 11:53:41.069', true);
INSERT INTO public.facilities VALUES ('cmq6ma43g0006al9gz9haarz7', 'Kasangati HC III', 'WAK-KAS-002', 'HC_III', 'cmq6l00xi0000alsglzvowss2', 0.4378, 32.5911, 'Kasangati HC III, Wakiso District', NULL, '2026-06-09 12:29:31.324', '2026-06-09 12:29:31.324', true);
INSERT INTO public.facilities VALUES ('cmq6ma43o0008al9gfw0xjvpm', 'Nansana HC IV', 'WAK-NAN-003', 'HC_IV', 'cmq6l00xi0000alsglzvowss2', 0.3639, 32.5286, 'Nansana HC IV, Wakiso District', NULL, '2026-06-09 12:29:31.332', '2026-06-09 12:29:31.332', true);
INSERT INTO public.facilities VALUES ('cmq6ma43p000aal9gvyoub1o9', 'Wakiso HC III', 'WAK-WAK-004', 'HC_III', 'cmq6l00xi0000alsglzvowss2', 0.4044, 32.4594, 'Wakiso HC III, Wakiso District', NULL, '2026-06-09 12:29:31.334', '2026-06-09 12:29:31.334', true);
INSERT INTO public.facilities VALUES ('cmq6ma43r000cal9g40o4q8vz', 'Entebbe General Hospital', 'WAK-ENT-005', 'GENERAL_HOSPITAL', 'cmq6l00xi0000alsglzvowss2', 0.0512, 32.4634, 'Entebbe General Hospital, Wakiso District', NULL, '2026-06-09 12:29:31.335', '2026-06-09 12:29:31.335', true);


--
-- Data for Name: Alert; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alerts VALUES ('cmq6mgvxt001gallguwecgwly', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49i000ral9g78ds2h8o', 'Metronidazole 400mg', 'WARNING', 'STOCK_CRITICAL', 'Metronidazole 400mg at Gayaza Hospital is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.345', '2026-06-09 12:34:47.345');
INSERT INTO public.alerts VALUES ('cmq6mgvy2001kallg1vzo9zf8', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49k000ual9gpdn7iphq', 'Ciprofloxacin 500mg', 'CRITICAL', 'STOCKOUT', 'Ciprofloxacin 500mg at Gayaza Hospital is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.354', '2026-06-09 12:34:47.354');
INSERT INTO public.alerts VALUES ('cmq6mgvy6001uallgyz6z6hhl', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49z0016al9g4965wnb3', 'Tenofovir/Lamivudine/Dolutegravir', 'WARNING', 'STOCK_CRITICAL', 'Tenofovir/Lamivudine/Dolutegravir at Gayaza Hospital is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.359', '2026-06-09 12:34:47.359');
INSERT INTO public.alerts VALUES ('cmq6mgvy8001yallg1b5hu364', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4a10019al9gv87uxz2j', 'Zidovudine/Lamivudine', 'CRITICAL', 'STOCKOUT', 'Zidovudine/Lamivudine at Gayaza Hospital is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.36', '2026-06-09 12:34:47.36');
INSERT INTO public.alerts VALUES ('cmq6mgvyb0028allgwr7if8s3', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4bf001lal9gn6zjy1ns', 'Enalapril 5mg', 'WARNING', 'STOCK_CRITICAL', 'Enalapril 5mg at Gayaza Hospital is critically low.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.364', '2026-06-09 12:34:47.364');
INSERT INTO public.alerts VALUES ('cmq6mgvyd002callgxl8lq4lb', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4bh001oal9gojgaak15', 'Metformin 500mg', 'CRITICAL', 'STOCKOUT', 'Metformin 500mg at Gayaza Hospital is out of stock.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.365', '2026-06-09 12:34:47.365');
INSERT INTO public.alerts VALUES ('cmq6mgvyh002mallgul00u1t4', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4di0020al9glbyt7o96', 'Oxytocin 10 IU', 'WARNING', 'STOCK_CRITICAL', 'Oxytocin 10 IU at Gayaza Hospital is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.37', '2026-06-09 12:34:47.37');
INSERT INTO public.alerts VALUES ('cmq6mgvyj002qallgkx6kdju8', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4dl0023al9gm877mrz0', 'Ferrous Folate', 'CRITICAL', 'STOCKOUT', 'Ferrous Folate at Gayaza Hospital is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.371', '2026-06-09 12:34:47.371');
INSERT INTO public.alerts VALUES ('cmq6mgvym0030allgaheelrg5', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4e6002fal9gqfcqd4s9', 'HIV Rapid Test Kit', 'WARNING', 'STOCK_CRITICAL', 'HIV Rapid Test Kit at Gayaza Hospital is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.374', '2026-06-09 12:34:47.374');
INSERT INTO public.alerts VALUES ('cmq6mgvyn0034allgz08745cp', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4e8002ial9gcwq9b5zq', 'Malaria RDT', 'CRITICAL', 'STOCKOUT', 'Malaria RDT at Gayaza Hospital is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.375', '2026-06-09 12:34:47.375');
INSERT INTO public.alerts VALUES ('cmq6mgvyp003eallg9cy8ggmg', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49i000ral9g78ds2h8o', 'Metronidazole 400mg', 'WARNING', 'STOCK_CRITICAL', 'Metronidazole 400mg at Kasangati HC III is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.378', '2026-06-09 12:34:47.378');
INSERT INTO public.alerts VALUES ('cmq6mgvyq003iallgbglvx4ka', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49k000ual9gpdn7iphq', 'Ciprofloxacin 500mg', 'CRITICAL', 'STOCKOUT', 'Ciprofloxacin 500mg at Kasangati HC III is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.379', '2026-06-09 12:34:47.379');
INSERT INTO public.alerts VALUES ('cmq6mgvyt003sallg2rr5vbyc', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49z0016al9g4965wnb3', 'Tenofovir/Lamivudine/Dolutegravir', 'WARNING', 'STOCK_CRITICAL', 'Tenofovir/Lamivudine/Dolutegravir at Kasangati HC III is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.382', '2026-06-09 12:34:47.382');
INSERT INTO public.alerts VALUES ('cmq6mgvyu003wallg0efyj051', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4a10019al9gv87uxz2j', 'Zidovudine/Lamivudine', 'CRITICAL', 'STOCKOUT', 'Zidovudine/Lamivudine at Kasangati HC III is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.383', '2026-06-09 12:34:47.383');
INSERT INTO public.alerts VALUES ('cmq6mgvyx0046allglkwl31kw', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4bf001lal9gn6zjy1ns', 'Enalapril 5mg', 'WARNING', 'STOCK_CRITICAL', 'Enalapril 5mg at Kasangati HC III is critically low.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.386', '2026-06-09 12:34:47.386');
INSERT INTO public.alerts VALUES ('cmq6mgvyz004aallgk56b53if', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4bh001oal9gojgaak15', 'Metformin 500mg', 'CRITICAL', 'STOCKOUT', 'Metformin 500mg at Kasangati HC III is out of stock.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.387', '2026-06-09 12:34:47.387');
INSERT INTO public.alerts VALUES ('cmq6mgvz2004kallg7zj4iz8r', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4di0020al9glbyt7o96', 'Oxytocin 10 IU', 'WARNING', 'STOCK_CRITICAL', 'Oxytocin 10 IU at Kasangati HC III is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.39', '2026-06-09 12:34:47.39');
INSERT INTO public.alerts VALUES ('cmq6mgvz3004oallgl6tpgaeq', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4dl0023al9gm877mrz0', 'Ferrous Folate', 'CRITICAL', 'STOCKOUT', 'Ferrous Folate at Kasangati HC III is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.391', '2026-06-09 12:34:47.391');
INSERT INTO public.alerts VALUES ('cmq6mgvz5004yallgb9m4uqjj', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4e6002fal9gqfcqd4s9', 'HIV Rapid Test Kit', 'WARNING', 'STOCK_CRITICAL', 'HIV Rapid Test Kit at Kasangati HC III is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.394', '2026-06-09 12:34:47.394');
INSERT INTO public.alerts VALUES ('cmq6mgvz60052allgot9vw1u8', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4e8002ial9gcwq9b5zq', 'Malaria RDT', 'CRITICAL', 'STOCKOUT', 'Malaria RDT at Kasangati HC III is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.395', '2026-06-09 12:34:47.395');
INSERT INTO public.alerts VALUES ('cmq6mgvz9005callgomv20dea', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49i000ral9g78ds2h8o', 'Metronidazole 400mg', 'WARNING', 'STOCK_CRITICAL', 'Metronidazole 400mg at Nansana HC IV is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.397', '2026-06-09 12:34:47.397');
INSERT INTO public.alerts VALUES ('cmq6mgvza005gallgwn4o1yta', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49k000ual9gpdn7iphq', 'Ciprofloxacin 500mg', 'CRITICAL', 'STOCKOUT', 'Ciprofloxacin 500mg at Nansana HC IV is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.398', '2026-06-09 12:34:47.398');
INSERT INTO public.alerts VALUES ('cmq6mgvzd005qallgtwngmlya', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49z0016al9g4965wnb3', 'Tenofovir/Lamivudine/Dolutegravir', 'WARNING', 'STOCK_CRITICAL', 'Tenofovir/Lamivudine/Dolutegravir at Nansana HC IV is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.402', '2026-06-09 12:34:47.402');
INSERT INTO public.alerts VALUES ('cmq6mgvze005uallgr36z1av6', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4a10019al9gv87uxz2j', 'Zidovudine/Lamivudine', 'CRITICAL', 'STOCKOUT', 'Zidovudine/Lamivudine at Nansana HC IV is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.403', '2026-06-09 12:34:47.403');
INSERT INTO public.alerts VALUES ('cmq6mgvzh0064allghsp64gr3', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4bf001lal9gn6zjy1ns', 'Enalapril 5mg', 'WARNING', 'STOCK_CRITICAL', 'Enalapril 5mg at Nansana HC IV is critically low.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.406', '2026-06-09 12:34:47.406');
INSERT INTO public.alerts VALUES ('cmq6mgvzi0068allgru45a8w2', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4bh001oal9gojgaak15', 'Metformin 500mg', 'CRITICAL', 'STOCKOUT', 'Metformin 500mg at Nansana HC IV is out of stock.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.407', '2026-06-09 12:34:47.407');
INSERT INTO public.alerts VALUES ('cmq6mgvzl006iallgu5lrsgxd', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4di0020al9glbyt7o96', 'Oxytocin 10 IU', 'WARNING', 'STOCK_CRITICAL', 'Oxytocin 10 IU at Nansana HC IV is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.409', '2026-06-09 12:34:47.409');
INSERT INTO public.alerts VALUES ('cmq6mgvzm006mallgyjv27iw4', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4dl0023al9gm877mrz0', 'Ferrous Folate', 'CRITICAL', 'STOCKOUT', 'Ferrous Folate at Nansana HC IV is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.41', '2026-06-09 12:34:47.41');
INSERT INTO public.alerts VALUES ('cmq6mgvzo006wallgnw4cs43u', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4e6002fal9gqfcqd4s9', 'HIV Rapid Test Kit', 'WARNING', 'STOCK_CRITICAL', 'HIV Rapid Test Kit at Nansana HC IV is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.413', '2026-06-09 12:34:47.413');
INSERT INTO public.alerts VALUES ('cmq6mgvzp0070allgl34908qf', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4e8002ial9gcwq9b5zq', 'Malaria RDT', 'CRITICAL', 'STOCKOUT', 'Malaria RDT at Nansana HC IV is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.414', '2026-06-09 12:34:47.414');
INSERT INTO public.alerts VALUES ('cmq6mgvzs007aallgxb597oar', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49i000ral9g78ds2h8o', 'Metronidazole 400mg', 'WARNING', 'STOCK_CRITICAL', 'Metronidazole 400mg at Wakiso HC III is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.416', '2026-06-09 12:34:47.416');
INSERT INTO public.alerts VALUES ('cmq6mgvzu007eallg2xb7b046', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49k000ual9gpdn7iphq', 'Ciprofloxacin 500mg', 'CRITICAL', 'STOCKOUT', 'Ciprofloxacin 500mg at Wakiso HC III is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.418', '2026-06-09 12:34:47.418');
INSERT INTO public.alerts VALUES ('cmq6mgvzx007oallgx1fq5rjh', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49z0016al9g4965wnb3', 'Tenofovir/Lamivudine/Dolutegravir', 'WARNING', 'STOCK_CRITICAL', 'Tenofovir/Lamivudine/Dolutegravir at Wakiso HC III is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.421', '2026-06-09 12:34:47.421');
INSERT INTO public.alerts VALUES ('cmq6mgvzy007sallgsf9w9zjn', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4a10019al9gv87uxz2j', 'Zidovudine/Lamivudine', 'CRITICAL', 'STOCKOUT', 'Zidovudine/Lamivudine at Wakiso HC III is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.422', '2026-06-09 12:34:47.422');
INSERT INTO public.alerts VALUES ('cmq6mgw000082allgliftf22t', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4bf001lal9gn6zjy1ns', 'Enalapril 5mg', 'WARNING', 'STOCK_CRITICAL', 'Enalapril 5mg at Wakiso HC III is critically low.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.425', '2026-06-09 12:34:47.425');
INSERT INTO public.alerts VALUES ('cmq6mgw020086allgqa1oju6t', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4bh001oal9gojgaak15', 'Metformin 500mg', 'CRITICAL', 'STOCKOUT', 'Metformin 500mg at Wakiso HC III is out of stock.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.426', '2026-06-09 12:34:47.426');
INSERT INTO public.alerts VALUES ('cmq6mgw05008gallgfc79mt6b', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4di0020al9glbyt7o96', 'Oxytocin 10 IU', 'WARNING', 'STOCK_CRITICAL', 'Oxytocin 10 IU at Wakiso HC III is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.429', '2026-06-09 12:34:47.429');
INSERT INTO public.alerts VALUES ('cmq6mgw06008kallgivq1o888', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4dl0023al9gm877mrz0', 'Ferrous Folate', 'CRITICAL', 'STOCKOUT', 'Ferrous Folate at Wakiso HC III is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.43', '2026-06-09 12:34:47.43');
INSERT INTO public.alerts VALUES ('cmq6mgw09008uallg7b5ewc8i', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4e6002fal9gqfcqd4s9', 'HIV Rapid Test Kit', 'WARNING', 'STOCK_CRITICAL', 'HIV Rapid Test Kit at Wakiso HC III is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.433', '2026-06-09 12:34:47.433');
INSERT INTO public.alerts VALUES ('cmq6mgw0a008yallggbfas767', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4e8002ial9gcwq9b5zq', 'Malaria RDT', 'CRITICAL', 'STOCKOUT', 'Malaria RDT at Wakiso HC III is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.435', '2026-06-09 12:34:47.435');
INSERT INTO public.alerts VALUES ('cmq6mgw0e0098allgu4si9ky5', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49i000ral9g78ds2h8o', 'Metronidazole 400mg', 'WARNING', 'STOCK_CRITICAL', 'Metronidazole 400mg at Entebbe General Hospital is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.438', '2026-06-09 12:34:47.438');
INSERT INTO public.alerts VALUES ('cmq6mgw0f009callg3mw2em3w', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49k000ual9gpdn7iphq', 'Ciprofloxacin 500mg', 'CRITICAL', 'STOCKOUT', 'Ciprofloxacin 500mg at Entebbe General Hospital is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.439', '2026-06-09 12:34:47.439');
INSERT INTO public.alerts VALUES ('cmq6mgw0j009mallgkfsqgm3x', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49z0016al9g4965wnb3', 'Tenofovir/Lamivudine/Dolutegravir', 'WARNING', 'STOCK_CRITICAL', 'Tenofovir/Lamivudine/Dolutegravir at Entebbe General Hospital is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.443', '2026-06-09 12:34:47.443');
INSERT INTO public.alerts VALUES ('cmq6mgw0k009qallgtabhtqbj', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4a10019al9gv87uxz2j', 'Zidovudine/Lamivudine', 'CRITICAL', 'STOCKOUT', 'Zidovudine/Lamivudine at Entebbe General Hospital is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.444', '2026-06-09 12:34:47.444');
INSERT INTO public.alerts VALUES ('cmq6mgw0m00a0allgneb9rp6k', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4bf001lal9gn6zjy1ns', 'Enalapril 5mg', 'WARNING', 'STOCK_CRITICAL', 'Enalapril 5mg at Entebbe General Hospital is critically low.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.447', '2026-06-09 12:34:47.447');
INSERT INTO public.alerts VALUES ('cmq6mgw0n00a4allg1ba69rgu', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4bh001oal9gojgaak15', 'Metformin 500mg', 'CRITICAL', 'STOCKOUT', 'Metformin 500mg at Entebbe General Hospital is out of stock.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.448', '2026-06-09 12:34:47.448');
INSERT INTO public.alerts VALUES ('cmq6mgw0q00aeallgnq8e273c', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4di0020al9glbyt7o96', 'Oxytocin 10 IU', 'WARNING', 'STOCK_CRITICAL', 'Oxytocin 10 IU at Entebbe General Hospital is critically low.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.451', '2026-06-09 12:34:47.451');
INSERT INTO public.alerts VALUES ('cmq6mgw0s00aiallgtc67q5vg', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4dl0023al9gm877mrz0', 'Ferrous Folate', 'CRITICAL', 'STOCKOUT', 'Ferrous Folate at Entebbe General Hospital is out of stock.', 'ACKNOWLEDGED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.452', '2026-06-09 12:34:47.452');
INSERT INTO public.alerts VALUES ('cmq6mgw0v00asallge17ivz3w', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4e6002fal9gqfcqd4s9', 'HIV Rapid Test Kit', 'WARNING', 'STOCK_CRITICAL', 'HIV Rapid Test Kit at Entebbe General Hospital is critically low.', 'RESOLVED', NULL, NULL, false, NULL, '2026-06-09 12:34:47.455', '2026-06-09 12:34:47.455');
INSERT INTO public.alerts VALUES ('cmq6mgw0w00awallgw8oqxoew', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4e8002ial9gcwq9b5zq', 'Malaria RDT', 'CRITICAL', 'STOCKOUT', 'Malaria RDT at Entebbe General Hospital is out of stock.', 'ACTIVE', NULL, NULL, false, NULL, '2026-06-09 12:34:47.457', '2026-06-09 12:34:47.457');


--
-- Data for Name: AuditLog; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Drug; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.drugs VALUES ('cmq6ma45l000ial9gyy3f39k1', 'Amoxicillin 250mg', 'Amoxicillin', 'ANTIBIOTIC', 'tablets', 'EMHS-001', NULL, '2026-06-09 12:29:31.402');
INSERT INTO public.drugs VALUES ('cmq6ma49c000lal9giu6tdoht', 'Amoxicillin 500mg', 'Amoxicillin', 'ANTIBIOTIC', 'tablets', 'EMHS-002', NULL, '2026-06-09 12:29:31.537');
INSERT INTO public.drugs VALUES ('cmq6ma49g000oal9guw1d8vml', 'Co-trimoxazole 480mg', 'Co-trimoxazole', 'ANTIBIOTIC', 'tablets', 'EMHS-003', NULL, '2026-06-09 12:29:31.54');
INSERT INTO public.drugs VALUES ('cmq6ma49i000ral9g78ds2h8o', 'Metronidazole 400mg', 'Metronidazole', 'ANTIBIOTIC', 'tablets', 'EMHS-004', NULL, '2026-06-09 12:29:31.542');
INSERT INTO public.drugs VALUES ('cmq6ma49k000ual9gpdn7iphq', 'Ciprofloxacin 500mg', 'Ciprofloxacin', 'ANTIBIOTIC', 'tablets', 'EMHS-005', NULL, '2026-06-09 12:29:31.544');
INSERT INTO public.drugs VALUES ('cmq6ma49u000xal9gh7mjos44', 'Artemether-Lumefantrine', 'Artemether/Lumefantrine', 'ANTIMALARIAL', 'tablets', 'EMHS-010', NULL, '2026-06-09 12:29:31.555');
INSERT INTO public.drugs VALUES ('cmq6ma49w0010al9g58v0xa4o', 'Artesunate 50mg', 'Artesunate', 'ANTIMALARIAL', 'vials', 'EMHS-011', NULL, '2026-06-09 12:29:31.557');
INSERT INTO public.drugs VALUES ('cmq6ma49y0013al9gikxs1g8l', 'Quinine 300mg', 'Quinine', 'ANTIMALARIAL', 'tablets', 'EMHS-012', NULL, '2026-06-09 12:29:31.558');
INSERT INTO public.drugs VALUES ('cmq6ma49z0016al9g4965wnb3', 'Tenofovir/Lamivudine/Dolutegravir', 'TLD', 'ARV', 'tablets', 'EMHS-020', NULL, '2026-06-09 12:29:31.56');
INSERT INTO public.drugs VALUES ('cmq6ma4a10019al9gv87uxz2j', 'Zidovudine/Lamivudine', 'AZT/3TC', 'ARV', 'tablets', 'EMHS-021', NULL, '2026-06-09 12:29:31.561');
INSERT INTO public.drugs VALUES ('cmq6ma4ab001cal9gvpg2fkyr', 'Paracetamol 500mg', 'Paracetamol', 'ANALGESIC', 'tablets', 'EMHS-030', NULL, '2026-06-09 12:29:31.572');
INSERT INTO public.drugs VALUES ('cmq6ma4b9001fal9g6ytegbjv', 'Ibuprofen 400mg', 'Ibuprofen', 'ANALGESIC', 'tablets', 'EMHS-031', NULL, '2026-06-09 12:29:31.605');
INSERT INTO public.drugs VALUES ('cmq6ma4bc001ial9gkzkhwd69', 'Amlodipine 5mg', 'Amlodipine', 'ANTIHYPERTENSIVE', 'tablets', 'EMHS-040', NULL, '2026-06-09 12:29:31.609');
INSERT INTO public.drugs VALUES ('cmq6ma4bf001lal9gn6zjy1ns', 'Enalapril 5mg', 'Enalapril', 'ANTIHYPERTENSIVE', 'tablets', 'EMHS-041', NULL, '2026-06-09 12:29:31.611');
INSERT INTO public.drugs VALUES ('cmq6ma4bh001oal9gojgaak15', 'Metformin 500mg', 'Metformin', 'ANTIDIABETIC', 'tablets', 'EMHS-050', NULL, '2026-06-09 12:29:31.613');
INSERT INTO public.drugs VALUES ('cmq6ma4bz001ral9gw6corcdl', 'Glibenclamide 5mg', 'Glibenclamide', 'ANTIDIABETIC', 'tablets', 'EMHS-051', NULL, '2026-06-09 12:29:31.632');
INSERT INTO public.drugs VALUES ('cmq6ma4c2001ual9ghabiyhvn', 'BCG Vaccine', 'BCG', 'VACCINE', 'vials', 'EMHS-060', NULL, '2026-06-09 12:29:31.634');
INSERT INTO public.drugs VALUES ('cmq6ma4de001xal9g99k10yfh', 'Measles Rubella Vaccine', 'MR', 'VACCINE', 'vials', 'EMHS-061', NULL, '2026-06-09 12:29:31.683');
INSERT INTO public.drugs VALUES ('cmq6ma4di0020al9glbyt7o96', 'Oxytocin 10 IU', 'Oxytocin', 'MATERNAL_HEALTH', 'ampoules', 'EMHS-070', NULL, '2026-06-09 12:29:31.687');
INSERT INTO public.drugs VALUES ('cmq6ma4dl0023al9gm877mrz0', 'Ferrous Folate', 'Iron/Folic acid', 'MATERNAL_HEALTH', 'tablets', 'EMHS-071', NULL, '2026-06-09 12:29:31.689');
INSERT INTO public.drugs VALUES ('cmq6ma4dn0026al9g1lpikscb', 'Magnesium Sulphate', 'MgSO4', 'MATERNAL_HEALTH', 'vials', 'EMHS-072', NULL, '2026-06-09 12:29:31.692');
INSERT INTO public.drugs VALUES ('cmq6ma4dz0029al9gnbljm855', 'Surgical Gloves', 'Gloves', 'SURGICAL_SUPPLY', 'pairs', 'EMHS-080', NULL, '2026-06-09 12:29:31.703');
INSERT INTO public.drugs VALUES ('cmq6ma4e4002cal9gs1q66xay', 'Gauze Bandage', 'Gauze', 'SURGICAL_SUPPLY', 'packs', 'EMHS-081', NULL, '2026-06-09 12:29:31.709');
INSERT INTO public.drugs VALUES ('cmq6ma4e6002fal9gqfcqd4s9', 'HIV Rapid Test Kit', 'HIV RDT', 'DIAGNOSTIC', 'kits', 'EMHS-090', NULL, '2026-06-09 12:29:31.711');
INSERT INTO public.drugs VALUES ('cmq6ma4e8002ial9gcwq9b5zq', 'Malaria RDT', 'Malaria RDT', 'DIAGNOSTIC', 'kits', 'EMHS-091', NULL, '2026-06-09 12:29:31.712');


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('cmq6l00yh0007alsg3ywrruan', 'admin@nms.ug', '$2b$12$hV9OSFm8CjxCHGRtTCHC3uIImi76YOEhtpwr3uO/2doAQpi1levjq', 'Grace Achieng', '+256700000030', 'NMS_ADMIN', NULL, NULL, '2026-06-09 11:53:41.082', '2026-06-09 12:34:47.148', true, NULL);
INSERT INTO public.users VALUES ('cmq6l00yf0006alsgnsolcer2', 'dho@wakiso.ug', '$2b$12$hV9OSFm8CjxCHGRtTCHC3uIImi76YOEhtpwr3uO/2doAQpi1levjq', 'James Okello', '+256700000020', 'DISTRICT_OFFICER', NULL, 'cmq6l00xi0000alsglzvowss2', '2026-06-09 11:53:41.079', '2026-06-09 12:36:28.3', true, '2026-06-09 12:36:28.291');
INSERT INTO public.users VALUES ('cmq6l00yb0004alsg4erw4a5g', 'pharmacist@gayaza.ug', '$2b$12$hV9OSFm8CjxCHGRtTCHC3uIImi76YOEhtpwr3uO/2doAQpi1levjq', 'Sarah Nakato', '+256700000010', 'FACILITY_WORKER', 'cmq6l00y50002alsgh05s36p9', NULL, '2026-06-09 11:53:41.075', '2026-06-09 12:50:19.555', true, '2026-06-09 12:50:19.553');


--
-- Data for Name: RefreshToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.refresh_tokens VALUES ('cmq6l22jq0001alc8a7ym5t9g', 'cmq6l00yb0004alsg4erw4a5g', 'ff499f78c6b1cdba48e47f26f6dd0e7bb776d493e1e82faeaee8c5dd87e0820f', '2026-06-16 11:55:16.448', '2026-06-09 11:55:16.452');
INSERT INTO public.refresh_tokens VALUES ('cmq6mfre70001al44ighqeowm', 'cmq6l00yb0004alsg4erw4a5g', '45d346bd027dc2dd30c775af3fe874da11a737e1e6e6be29762011befb040a69', '2026-06-16 12:33:54.79', '2026-06-09 12:33:54.798');
INSERT INTO public.refresh_tokens VALUES ('cmq6mhllp0001alqsd1anjuuv', 'cmq6l00yb0004alsg4erw4a5g', 'cbd42ad8d5ef1e1be8a7437ceec19f16ba1818b9338ab5796b8ddeb0f5770244', '2026-06-16 12:35:20.604', '2026-06-09 12:35:20.605');
INSERT INTO public.refresh_tokens VALUES ('cmq6mj1u60003alqselgml5e2', 'cmq6l00yf0006alsgnsolcer2', 'd7be6261649a0c9272cb2f4e480a0f4b99a70e1fb7a0ea3bfc6b618ba05a5049', '2026-06-16 12:36:28.293', '2026-06-09 12:36:28.303');
INSERT INTO public.refresh_tokens VALUES ('cmq6n0ghe0007alc8q1hnylki', 'cmq6l00yb0004alsg4erw4a5g', 'c751aba3b53c12262c1896bc61b2fe2a2323fc7d3b162c36f873b04840d26a50', '2026-06-16 12:50:00.432', '2026-06-09 12:50:00.433');
INSERT INTO public.refresh_tokens VALUES ('cmq6rpu2a0001alcck18hsm9s', 'cmq6l00yb0004alsg4erw4a5g', '00f7f53ad2e6ddc5e7dd00cbfe6496b1205d1ed4ccbf0eeca8cd3e5ae698142a', '2026-06-16 15:01:42.889', '2026-06-09 15:01:42.894');


--
-- Data for Name: ResupplyRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: SmsLog; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: StockEntry; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.stock_entries VALUES ('cmq6mgvx50018allgfr0egwhk', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma45l000ial9gyy3f39k1', 3600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.199', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.322');
INSERT INTO public.stock_entries VALUES ('cmq6mgvxm001aallgvcgrzxad', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49c000lal9giu6tdoht', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.338', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.339');
INSERT INTO public.stock_entries VALUES ('cmq6mgvxr001callg8etzt8qw', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49g000oal9guw1d8vml', 600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.343', NULL, 'LOW', 10, '2026-06-09 12:34:47.344');
INSERT INTO public.stock_entries VALUES ('cmq6mgvxs001eallgiahc813f', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49i000ral9g78ds2h8o', 135, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.344', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.345');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy0001iallgs26azm26', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49k000ual9gpdn7iphq', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.352', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.353');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy2001mallgq9y6qv7k', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49u000xal9gh7mjos44', 6000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.354', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.355');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy3001oallgaa2svvbh', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49w0010al9g58v0xa4o', 750, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.355', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.356');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy5001qallgnfat8hqf', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49y0013al9gikxs1g8l', 400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.356', NULL, 'LOW', 10, '2026-06-09 12:34:47.357');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy6001sallgsdbn6h8u', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma49z0016al9g4965wnb3', 270, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.357', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.358');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy7001wallgu74ts5el', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4a10019al9gv87uxz2j', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.359', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.359');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy90020allgrmpix8gv', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4ab001cal9gvpg2fkyr', 9000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.36', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.361');
INSERT INTO public.stock_entries VALUES ('cmq6mgvy90022allgnn0cgqly', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4b9001fal9g6ytegbjv', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.361', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.362');
INSERT INTO public.stock_entries VALUES ('cmq6mgvya0024allghb626fqu', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4bc001ial9gkzkhwd69', 500, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.362', NULL, 'LOW', 10, '2026-06-09 12:34:47.362');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyb0026allgcpu6twgv', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4bf001lal9gn6zjy1ns', 120, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.362', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.363');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyc002aallg7gd8ss4v', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4bh001oal9gojgaak15', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.364', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.365');
INSERT INTO public.stock_entries VALUES ('cmq6mgvye002eallg8d3m6y9j', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4bz001ral9gw6corcdl', 750, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.365', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.366');
INSERT INTO public.stock_entries VALUES ('cmq6mgvye002gallgf6qhhcht', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4c2001ual9ghabiyhvn', 150, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.366', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.367');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyg002iallgvoerb3p0', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4de001xal9g99k10yfh', 80, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.367', NULL, 'LOW', 10, '2026-06-09 12:34:47.368');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyh002kallg3abk6kl5', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4di0020al9glbyt7o96', 45, 'ampoules', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.368', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.369');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyi002oallg6o0vqd5d', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4dl0023al9gm877mrz0', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.37', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.371');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyj002sallgmukcxq6s', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4dn0026al9g1lpikscb', 300, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.371', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.372');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyk002uallgge271a97', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4dz0029al9gnbljm855', 1500, 'pairs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.372', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.372');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyl002wallg7pa3itcz', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4e4002cal9gs1q66xay', 200, 'packs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.372', NULL, 'LOW', 10, '2026-06-09 12:34:47.373');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyl002yallg5gj2z4ar', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4e6002fal9gqfcqd4s9', 90, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.373', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.374');
INSERT INTO public.stock_entries VALUES ('cmq6mgvym0032allgamyf3akv', 'cmq6l00y50002alsgh05s36p9', 'cmq6ma4e8002ial9gcwq9b5zq', 0, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.374', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.375');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyn0036allg367c337u', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma45l000ial9gyy3f39k1', 3600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.375', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.376');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyo0038allgkk6htpy3', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49c000lal9giu6tdoht', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.375', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.376');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyo003aallgeih963na', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49g000oal9guw1d8vml', 600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.376', NULL, 'LOW', 10, '2026-06-09 12:34:47.377');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyp003callgtzxj2pm8', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49i000ral9g78ds2h8o', 135, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.376', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.377');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyq003gallgypc8c34z', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49k000ual9gpdn7iphq', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.378', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.378');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyr003kallg9zay768n', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49u000xal9gh7mjos44', 6000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.379', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.379');
INSERT INTO public.stock_entries VALUES ('cmq6mgvys003mallg5gce2v9p', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49w0010al9g58v0xa4o', 750, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.379', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.38');
INSERT INTO public.stock_entries VALUES ('cmq6mgvys003oallg2blk97qh', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49y0013al9gikxs1g8l', 400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.38', NULL, 'LOW', 10, '2026-06-09 12:34:47.381');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyt003qallg94brfhff', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma49z0016al9g4965wnb3', 270, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.38', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.381');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyu003uallgwmgt8tsd', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4a10019al9gv87uxz2j', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.381', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.382');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyv003yallgc36vnzre', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4ab001cal9gvpg2fkyr', 9000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.382', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.383');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyv0040allgtdauqven', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4b9001fal9g6ytegbjv', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.383', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.384');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyw0042allg2hy1clya', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4bc001ial9gkzkhwd69', 500, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.384', NULL, 'LOW', 10, '2026-06-09 12:34:47.385');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyx0044allgfzf63kig', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4bf001lal9gn6zjy1ns', 120, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.384', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.385');
INSERT INTO public.stock_entries VALUES ('cmq6mgvyy0048allg2kis0947', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4bh001oal9gojgaak15', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.386', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.387');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz0004callgacruf9c4', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4bz001ral9gw6corcdl', 750, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.387', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.388');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz0004eallgh53e0nsm', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4c2001ual9ghabiyhvn', 150, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.388', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.388');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz1004gallgasv4vy7o', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4de001xal9g99k10yfh', 80, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.388', NULL, 'LOW', 10, '2026-06-09 12:34:47.389');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz1004iallgda09vd8k', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4di0020al9glbyt7o96', 45, 'ampoules', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.389', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.39');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz2004mallgfn2esmfn', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4dl0023al9gm877mrz0', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.39', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.391');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz3004qallgsxe5h0bw', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4dn0026al9g1lpikscb', 300, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.391', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.392');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz4004sallglofylecx', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4dz0029al9gnbljm855', 1500, 'pairs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.392', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.392');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz4004uallgdmdgj2np', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4e4002cal9gs1q66xay', 200, 'packs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.392', NULL, 'LOW', 10, '2026-06-09 12:34:47.393');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz5004wallg4pgv0sx5', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4e6002fal9gqfcqd4s9', 90, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.392', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.393');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz60050allgjptig0om', 'cmq6ma43g0006al9gz9haarz7', 'cmq6ma4e8002ial9gcwq9b5zq', 0, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.393', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.394');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz70054allg4a0zl03i', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma45l000ial9gyy3f39k1', 3600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.394', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.395');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz70056allg3g2y1hml', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49c000lal9giu6tdoht', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.395', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.396');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz80058allgikacucgm', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49g000oal9guw1d8vml', 600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.395', NULL, 'LOW', 10, '2026-06-09 12:34:47.396');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz8005aallglqeljj4n', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49i000ral9g78ds2h8o', 135, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.396', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.397');
INSERT INTO public.stock_entries VALUES ('cmq6mgvz9005eallgik7bzigu', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49k000ual9gpdn7iphq', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.397', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.398');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzb005iallg3eedjeik', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49u000xal9gh7mjos44', 6000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.398', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.399');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzb005kallg5pvgvkcu', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49w0010al9g58v0xa4o', 750, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.399', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.4');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzc005mallg8bu1zltb', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49y0013al9gikxs1g8l', 400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.399', NULL, 'LOW', 10, '2026-06-09 12:34:47.4');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzc005oallg34xrfc2x', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma49z0016al9g4965wnb3', 270, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.4', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.401');
INSERT INTO public.stock_entries VALUES ('cmq6mgvze005sallg3rmui8jl', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4a10019al9gv87uxz2j', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.401', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.402');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzf005wallg4c8np20f', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4ab001cal9gvpg2fkyr', 9000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.403', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.403');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzg005yallgi4kw11nn', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4b9001fal9g6ytegbjv', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.403', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.404');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzg0060allgooq3u4qo', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4bc001ial9gkzkhwd69', 500, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.404', NULL, 'LOW', 10, '2026-06-09 12:34:47.405');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzh0062allgp1ee9ugy', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4bf001lal9gn6zjy1ns', 120, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.404', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.405');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzi0066allgjt2magc4', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4bh001oal9gojgaak15', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.405', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.406');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzj006aallgh9373s71', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4bz001ral9gw6corcdl', 750, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.406', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.407');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzj006callg0l6iqu0k', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4c2001ual9ghabiyhvn', 150, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.407', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.408');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzk006eallgtg7edf5g', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4de001xal9g99k10yfh', 80, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.407', NULL, 'LOW', 10, '2026-06-09 12:34:47.408');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzk006gallg3d44h305', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4di0020al9glbyt7o96', 45, 'ampoules', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.408', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.409');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzl006kallg7og90fqa', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4dl0023al9gm877mrz0', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.409', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.41');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzm006oallgkbn3mpf9', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4dn0026al9g1lpikscb', 300, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.41', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.411');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzn006qallgln2ek5te', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4dz0029al9gnbljm855', 1500, 'pairs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.41', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.411');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzn006sallgvkqoayna', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4e4002cal9gs1q66xay', 200, 'packs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.411', NULL, 'LOW', 10, '2026-06-09 12:34:47.412');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzo006uallgjz31e3jx', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4e6002fal9gqfcqd4s9', 90, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.411', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.412');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzp006yallgov8mu447', 'cmq6ma43o0008al9gfw0xjvpm', 'cmq6ma4e8002ial9gcwq9b5zq', 0, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.412', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.413');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzq0072allg3jwyg63o', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma45l000ial9gyy3f39k1', 3600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.413', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.414');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzq0074allg9a47051f', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49c000lal9giu6tdoht', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.414', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.415');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzr0076allg07twtea4', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49g000oal9guw1d8vml', 600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.415', NULL, 'LOW', 10, '2026-06-09 12:34:47.415');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzr0078allgb03g45eb', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49i000ral9g78ds2h8o', 135, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.415', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.416');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzt007callgi1nf7vc2', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49k000ual9gpdn7iphq', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.416', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.417');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzu007gallg7uqp80pz', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49u000xal9gh7mjos44', 6000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.418', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.419');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzv007iallg6n98hj1m', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49w0010al9g58v0xa4o', 750, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.419', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.419');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzw007kallgbmovrn47', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49y0013al9gikxs1g8l', 400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.419', NULL, 'LOW', 10, '2026-06-09 12:34:47.42');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzw007mallg4x9bfraf', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma49z0016al9g4965wnb3', 270, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.42', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.421');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzx007qallg87u6ie2v', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4a10019al9gv87uxz2j', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.421', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.422');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzy007uallguuiksyvu', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4ab001cal9gvpg2fkyr', 9000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.422', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.423');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzz007wallgab0lgyzt', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4b9001fal9g6ytegbjv', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.423', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.423');
INSERT INTO public.stock_entries VALUES ('cmq6mgvzz007yallgjp71azkg', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4bc001ial9gkzkhwd69', 500, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.423', NULL, 'LOW', 10, '2026-06-09 12:34:47.424');
INSERT INTO public.stock_entries VALUES ('cmq6mgw000080allgbh5dwude', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4bf001lal9gn6zjy1ns', 120, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.424', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.424');
INSERT INTO public.stock_entries VALUES ('cmq6mgw010084allg78tmcgkl', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4bh001oal9gojgaak15', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.425', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.426');
INSERT INTO public.stock_entries VALUES ('cmq6mgw020088allg71qd8lxz', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4bz001ral9gw6corcdl', 750, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.426', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.427');
INSERT INTO public.stock_entries VALUES ('cmq6mgw03008aallg4ju3pbkb', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4c2001ual9ghabiyhvn', 150, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.426', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.427');
INSERT INTO public.stock_entries VALUES ('cmq6mgw03008callg9zcltynk', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4de001xal9g99k10yfh', 80, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.427', NULL, 'LOW', 10, '2026-06-09 12:34:47.428');
INSERT INTO public.stock_entries VALUES ('cmq6mgw04008eallgi6otclw3', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4di0020al9glbyt7o96', 45, 'ampoules', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.428', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.429');
INSERT INTO public.stock_entries VALUES ('cmq6mgw05008iallg5qn1jkv7', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4dl0023al9gm877mrz0', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.429', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.43');
INSERT INTO public.stock_entries VALUES ('cmq6mgw07008mallglrw9y63d', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4dn0026al9g1lpikscb', 300, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.43', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.431');
INSERT INTO public.stock_entries VALUES ('cmq6mgw07008oallgygw6znp4', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4dz0029al9gnbljm855', 1500, 'pairs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.431', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.432');
INSERT INTO public.stock_entries VALUES ('cmq6mgw08008qallg4zvejg6x', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4e4002cal9gs1q66xay', 200, 'packs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.431', NULL, 'LOW', 10, '2026-06-09 12:34:47.432');
INSERT INTO public.stock_entries VALUES ('cmq6mgw08008sallgvgvouodf', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4e6002fal9gqfcqd4s9', 90, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.432', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.433');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0a008wallgmk3kdnxr', 'cmq6ma43p000aal9gvyoub1o9', 'cmq6ma4e8002ial9gcwq9b5zq', 0, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.433', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.434');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0b0090allgv4s6dqkq', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma45l000ial9gyy3f39k1', 3600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.435', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.436');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0c0092allginjvr8ll', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49c000lal9giu6tdoht', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.436', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.437');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0d0094allg74prgfjb', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49g000oal9guw1d8vml', 600, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.436', NULL, 'LOW', 10, '2026-06-09 12:34:47.437');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0d0096allgfdibc6z5', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49i000ral9g78ds2h8o', 135, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.437', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.438');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0e009aallgum16p6y9', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49k000ual9gpdn7iphq', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.438', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.439');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0f009eallging1este', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49u000xal9gh7mjos44', 6000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.439', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.44');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0g009gallg5snfu69j', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49w0010al9g58v0xa4o', 750, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.44', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.44');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0h009iallgxya0oovz', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49y0013al9gikxs1g8l', 400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.44', NULL, 'LOW', 10, '2026-06-09 12:34:47.441');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0i009kallgkzxcqo8z', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma49z0016al9g4965wnb3', 270, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.441', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.442');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0j009oallg7vz7lzlv', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4a10019al9gv87uxz2j', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.443', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.444');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0k009sallg4mu5w0ib', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4ab001cal9gvpg2fkyr', 9000, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.444', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.445');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0l009uallgxsmujy5y', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4b9001fal9g6ytegbjv', 2400, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.444', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.445');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0l009wallgzmudhjc8', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4bc001ial9gkzkhwd69', 500, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.445', NULL, 'LOW', 10, '2026-06-09 12:34:47.446');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0m009yallgpsenu9jn', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4bf001lal9gn6zjy1ns', 120, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.445', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.446');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0n00a2allggx4v3mwt', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4bh001oal9gojgaak15', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.446', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.447');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0o00a6allg9bfdxxkn', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4bz001ral9gw6corcdl', 750, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.448', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.448');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0o00a8allgsu5mhlbn', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4c2001ual9ghabiyhvn', 150, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.448', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.449');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0p00aaallgtxltqqhh', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4de001xal9g99k10yfh', 80, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.449', NULL, 'LOW', 10, '2026-06-09 12:34:47.449');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0p00acallgp9dx9kwa', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4di0020al9glbyt7o96', 45, 'ampoules', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.449', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.45');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0r00agallgnrdeyr1n', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4dl0023al9gm877mrz0', 0, 'tablets', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.451', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.452');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0t00akallg7aav2r03', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4dn0026al9g1lpikscb', 300, 'vials', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.452', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.453');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0t00amallgyi7t47ih', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4dz0029al9gnbljm855', 1500, 'pairs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.453', NULL, 'ADEQUATE', 30, '2026-06-09 12:34:47.454');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0u00aoallgz1f0u3ym', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4e4002cal9gs1q66xay', 200, 'packs', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.453', NULL, 'LOW', 10, '2026-06-09 12:34:47.454');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0u00aqallgm4yyncw6', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4e6002fal9gqfcqd4s9', 90, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.454', NULL, 'CRITICAL', 3, '2026-06-09 12:34:47.455');
INSERT INTO public.stock_entries VALUES ('cmq6mgw0w00auallg3rnbboce', 'cmq6ma43r000cal9g40o4q8vz', 'cmq6ma4e8002ial9gcwq9b5zq', 0, 'kits', 'cmq6l00yb0004alsg4erw4a5g', '2026-06-09 12:34:47.455', NULL, 'STOCKOUT', 0, '2026-06-09 12:34:47.456');


--
-- Data for Name: Threshold; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.thresholds VALUES ('cmq6ma498000kal9gvl7w1187', NULL, 'cmq6ma45l000ial9gyy3f39k1', 14, 7, 120);
INSERT INTO public.thresholds VALUES ('cmq6ma49f000nal9gekv2fzve', NULL, 'cmq6ma49c000lal9giu6tdoht', 14, 7, 80);
INSERT INTO public.thresholds VALUES ('cmq6ma49h000qal9g2lpw6afn', NULL, 'cmq6ma49g000oal9guw1d8vml', 14, 7, 60);
INSERT INTO public.thresholds VALUES ('cmq6ma49j000tal9gprwo8ers', NULL, 'cmq6ma49i000ral9g78ds2h8o', 14, 7, 45);
INSERT INTO public.thresholds VALUES ('cmq6ma49t000wal9gt4i2d6dq', NULL, 'cmq6ma49k000ual9gpdn7iphq', 14, 7, 30);
INSERT INTO public.thresholds VALUES ('cmq6ma49w000zal9g310pmxq7', NULL, 'cmq6ma49u000xal9gh7mjos44', 14, 7, 200);
INSERT INTO public.thresholds VALUES ('cmq6ma49x0012al9gc8adh0zi', NULL, 'cmq6ma49w0010al9g58v0xa4o', 14, 7, 25);
INSERT INTO public.thresholds VALUES ('cmq6ma49z0015al9gxjtr0ova', NULL, 'cmq6ma49y0013al9gikxs1g8l', 14, 7, 40);
INSERT INTO public.thresholds VALUES ('cmq6ma4a00018al9g4vinmxkl', NULL, 'cmq6ma49z0016al9g4965wnb3', 14, 7, 90);
INSERT INTO public.thresholds VALUES ('cmq6ma4a2001bal9gvuspw56x', NULL, 'cmq6ma4a10019al9gv87uxz2j', 14, 7, 35);
INSERT INTO public.thresholds VALUES ('cmq6ma4b7001eal9g6pd24o7z', NULL, 'cmq6ma4ab001cal9gvpg2fkyr', 14, 7, 300);
INSERT INTO public.thresholds VALUES ('cmq6ma4bc001hal9gj6muh8tg', NULL, 'cmq6ma4b9001fal9g6ytegbjv', 14, 7, 80);
INSERT INTO public.thresholds VALUES ('cmq6ma4be001kal9gg9z9hc3g', NULL, 'cmq6ma4bc001ial9gkzkhwd69', 14, 7, 50);
INSERT INTO public.thresholds VALUES ('cmq6ma4bg001nal9gzora7eke', NULL, 'cmq6ma4bf001lal9gn6zjy1ns', 14, 7, 40);
INSERT INTO public.thresholds VALUES ('cmq6ma4by001qal9gtzr2r8ct', NULL, 'cmq6ma4bh001oal9gojgaak15', 14, 7, 70);
INSERT INTO public.thresholds VALUES ('cmq6ma4c1001tal9gstenx1pl', NULL, 'cmq6ma4bz001ral9gw6corcdl', 14, 7, 25);
INSERT INTO public.thresholds VALUES ('cmq6ma4c3001wal9g6ar8beup', NULL, 'cmq6ma4c2001ual9ghabiyhvn', 14, 7, 5);
INSERT INTO public.thresholds VALUES ('cmq6ma4dh001zal9gaoork5uq', NULL, 'cmq6ma4de001xal9g99k10yfh', 14, 7, 8);
INSERT INTO public.thresholds VALUES ('cmq6ma4dk0022al9gwpdsqs92', NULL, 'cmq6ma4di0020al9glbyt7o96', 14, 7, 15);
INSERT INTO public.thresholds VALUES ('cmq6ma4dm0025al9gybqd3yhy', NULL, 'cmq6ma4dl0023al9gm877mrz0', 14, 7, 100);
INSERT INTO public.thresholds VALUES ('cmq6ma4do0028al9g93ohjpjl', NULL, 'cmq6ma4dn0026al9g1lpikscb', 14, 7, 10);
INSERT INTO public.thresholds VALUES ('cmq6ma4e3002bal9ga5l33qej', NULL, 'cmq6ma4dz0029al9gnbljm855', 14, 7, 50);
INSERT INTO public.thresholds VALUES ('cmq6ma4e6002eal9gpj47lek7', NULL, 'cmq6ma4e4002cal9gs1q66xay', 14, 7, 20);
INSERT INTO public.thresholds VALUES ('cmq6ma4e8002hal9g912gtm62', NULL, 'cmq6ma4e6002fal9gqfcqd4s9', 14, 7, 30);
INSERT INTO public.thresholds VALUES ('cmq6ma4e9002kal9gic8tsai5', NULL, 'cmq6ma4e8002ial9gcwq9b5zq', 14, 7, 150);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('ef783aef-e61c-4f5b-a37e-a922f5405754', '7216c8dfcfb55e79d5a04bcf1cef1702de5b58aaf42bc36c0f4b30a4aa61129a', '2026-06-09 14:53:27.518693+03', '20260609115327_init', NULL, NULL, '2026-06-09 14:53:27.389282+03', 1);


--
-- PostgreSQL database dump complete
--

\unrestrict zrtEHbgsb7T8M0AmGOGXmoEWpbtBYFhBc6A9I9Pbmv4dsSTPAPdbIdRFhMDamEp

