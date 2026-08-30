package cl.json;

import static org.junit.Assert.assertEquals;

import java.io.File;

import javax.xml.parsers.DocumentBuilderFactory;

import org.junit.Before;
import org.junit.Test;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class FileProviderPathsTest {
    private Document paths;

    @Before
    public void readPaths() throws Exception {
        paths = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(
                new File("src/main/res/xml/share_download_paths.xml"));
    }

    @Test
    public void includesAppInternalFilesDirectory() {
        assertEquals(1, paths.getElementsByTagName("files-path").getLength());
        Element filesPath = (Element) paths.getElementsByTagName("files-path").item(0);

        assertEquals("rnshare_files", filesPath.getAttribute("name"));
        assertEquals(".", filesPath.getAttribute("path"));
    }

    @Test
    public void doesNotExposeRootPath() {
        assertEquals(0, paths.getElementsByTagName("root-path").getLength());
    }
}
